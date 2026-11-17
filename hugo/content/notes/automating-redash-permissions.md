---
title: "Automating Redash permissions with the Redash API"
date: 2022-07-13T07:30:03+05:30
lastmod: 2026-11-17
description: "Engineers waited on an admin to get access to Redash query groups. A small Python client on the Redash API let an approval flow grant access in seconds, with an audit trail."
kind: "technical"
toc: true
---

[Redash](https://redash.io/) is an open-source tool to query data sources, build dashboards and share them.
At my company, many teams ran queries in one Redash instance.
Access to data sources was controlled by Redash **groups**.

As the team grew, access requests went through one admin.
An engineer asked in chat, waited, and then got added by hand.
Nobody could say later who approved which access, or why.

We already had an internal self-service portal, built on Django.
In that portal, a user requests a permission and an approver accepts or rejects it.
This note shows how I connected Redash to that flow with the Redash API.

## The flow

1. The user opens the portal. The portal shows the Redash groups the user is not in.
2. The user selects a group and gives a reason.
3. The approver accepts the request.
4. The portal adds the user to the group through the Redash API, and records who approved it.

Everyone at the company already had a Redash account through Google SSO.
So the portal only changes group membership. It does not create users.

## How the Redash API works

The Redash API follows the web app's routes.
Add `/api/` between the base URL and the route.
If the groups page is `https://redash.example.com/groups`, the API endpoint is `https://redash.example.com/api/groups`.

Every request uses an API key in the `Authorization` header.
Group changes need an **admin** user's API key.
Use a dedicated service user for this, not a person's key.
Then the audit log in Redash shows the portal as the actor, and you can rotate the key without breaking someone's account.

The endpoints this flow uses:

| Method | Path | Use |
|---|---|---|
| `GET` | `/api/session` | Check that the key works |
| `GET` | `/api/groups` | List all groups |
| `GET` | `/api/users?q=<email>` | Find a user and their groups |
| `POST` | `/api/groups/<id>/members` | Add a user to a group |
| `DELETE` | `/api/groups/<id>/members/<user_id>` | Remove a user from a group |

## A small client

The client wraps a `requests.Session` with a timeout, the key and one error path.

```python
import os
import requests


class RedashError(Exception):
    pass


class Redash:
    def __init__(self, base_url: str, api_key: str, timeout: float = 10.0):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers["Authorization"] = f"Key {api_key}"

    def _request(self, method: str, path: str, **kwargs):
        url = f"{self.base_url}/api/{path.lstrip('/')}"
        response = self.session.request(method, url, timeout=self.timeout, **kwargs)
        if not response.ok:
            raise RedashError(f"{method} {path} failed: {response.status_code} {response.text[:200]}")
        return response.json() if response.content else None

    def is_healthy(self) -> bool:
        try:
            self._request("GET", "session")
            return True
        except (RedashError, requests.RequestException):
            return False


redash = Redash(os.environ["REDASH_URL"], os.environ["REDASH_API_KEY"])
```

Keep the key in an environment variable or a secret store.
Do not put it in the code or in the portal's database.

## Find the user by exact email

`GET /api/users?q=` is a search, not a lookup.
A search for `amit@example.com` can also match `amit.k@example.com`.
So filter the results for an exact, case-insensitive match.

```python
    def find_user(self, email: str) -> dict | None:
        data = self._request("GET", "users", params={"q": email, "page_size": 20})
        for user in data["results"]:
            if user["email"].lower() == email.lower():
                return user
        return None
```

The user object includes the user's groups.
Depending on the Redash version, `groups` holds group IDs or `{id, name}` objects.
This helper accepts both.

```python
    @staticmethod
    def group_ids(user: dict) -> set[int]:
        return {g["id"] if isinstance(g, dict) else g for g in user.get("groups", [])}
```

## List the groups a user can request

The API has no endpoint for "groups this user is not in".
Get all groups, then remove the user's groups.
Compare IDs, not names. Two groups can have similar names, and a group can be renamed.

```python
    def requestable_groups(self, email: str, hidden: set[str] = frozenset({"admin"})) -> list[dict]:
        user = self.find_user(email)
        if user is None:
            raise RedashError(f"No Redash user for {email}. Ask them to sign in once with SSO.")
        current = self.group_ids(user)
        return [
            {"id": g["id"], "name": g["name"]}
            for g in self._request("GET", "groups")
            if g["id"] not in current and g["name"] not in hidden
        ]
```

The `hidden` set keeps sensitive groups, like `admin`, out of the request form.
Those groups stay a manual decision.

## Grant and revoke access

Grant access only after approval.
Look up the user again at that moment.
The user may have left the company or been removed from Redash since they made the request.
If the user is already in the group, do nothing. This makes a retried request safe.

```python
    def grant(self, email: str, group_id: int) -> bool:
        user = self.find_user(email)
        if user is None:
            raise RedashError(f"{email} no longer exists in Redash")
        if group_id in self.group_ids(user):
            return False  # already a member
        self._request("POST", f"groups/{group_id}/members", json={"user_id": user["id"]})
        return True

    def revoke(self, email: str, group_id: int) -> bool:
        user = self.find_user(email)
        if user is None or group_id not in self.group_ids(user):
            return False
        self._request("DELETE", f"groups/{group_id}/members/{user['id']}")
        return True
```

`revoke` lets the portal remove access when a request expires or a person changes team.
Access that only grows is the main cause of permission sprawl.

## Wire it to the approval

In the Django view that handles an approval, call `grant` and save the result with the request.

```python
def approve(request, access_request_id):
    access_request = AccessRequest.objects.get(pk=access_request_id, status="pending")
    changed = redash.grant(access_request.email, access_request.group_id)
    access_request.status = "granted"
    access_request.approved_by = request.user
    access_request.note = "added" if changed else "already a member"
    access_request.save()
```

The portal now holds the full record: who asked, why, who approved and when.
Redash holds the membership.

## What changed

- Access requests no longer go through one admin's chat.
- Approvers decide in one place, with the reason in front of them.
- Every grant has an owner and a timestamp, so an access review takes minutes, not a meeting.

The same pattern works for any internal tool with an admin API: show only what a user can request, grant on approval, make every call safe to retry, and record who approved it.

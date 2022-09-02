---
title: "Automating Redash permission with Redash API"
date: 2022-07-13T07:30:03+05:30
# weight: 1
# aliases: ["/first"]
tags: ["devops", "tech"]
author: "Abhibhaw"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Hands on with Redash API with python"
canonicalURL: "https://redash.io/help/user-guide/integrations-and-api/api/"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
    image: "https://redash.io/assets/images/elements/visualize-data.png" # image path/url
    alt: "Redash Dashboard" # alt text
    caption: "Visualise your data" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: false # only hide on current single page
editPost:
    URL: "https://github.com/abhibhaw/abhibhaw.github.io/tree/main/hugo/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
---

Redash is such an amazing tool that literally helps you make sense of your data. If this is the first time you have encountered this word:

> [Redash](https://redash.io/) is an opensource tool that helps you to connect and query your data sources, build some cool dashboards & graphs to visualize data and share them with your team.

We at our company are using the same to run tons of queries across multiple datasources and teams. But as the team size kept growing, it becames difficult to manage and audit the permissions of the users.

Luckily we have our in-house permission management dashboard built over Django, where a user raises a request to get a particular permission and the manager **aka approver** verifies and approves the request. So we decided to add this Redash permission thing to the same flow. In our case anyone with our company's email have default access to redash (via Google SSO), so we will be only updating the permissions for user in this article, you can use the same approach for creating new user or any other api requirements as well.

## Context

As stated above our dashboard is built over Django, the code examples below are in python, but you can use any language of your choice.

After going through the [Redash API docs](https://redash.io/help/user-guide/integrations-and-api/api/), our redash client network tab and few googling, I figured out that the redash API is pretty simple and straight forward. You just need to append `/api/` between your base url and route to get the API endpoint.

> ### The Solution

> Let's say your redash client is accessible at: `https://redash.example.com/` and you are able to get the list of all the groups at: `https://redash.example.com/groups`, then the API endpoint would be: `https://redash.example.com/api/groups`

## Coding Begins

Now that we have the API endpoint, we can start the interesting part of writing the code. We will be using the [requests](https://docs.python-requests.org/en/master/) library to make the API calls. Let's begin by building up some utility functions for the same.

### Common Utility Functions

```
import requests

class Redash():
    def __init__(self, endpoint, api_key):
        self.redash_url = endpoint
        self.session = requests.Session()
        self.session.headers.update({"Authorization": "Key {}".format(api_key)})

    def _get(self, path, **kwargs):
        return self._request("GET", path, **kwargs)

    def _post(self, path, **kwargs):
        return self._request("POST", path, **kwargs)

    def _put(self, path, **kwargs):
        return self._request("PUT", path, **kwargs)

    def _patch(self, path, **kwargs):
        return self._request("PATCH", path, **kwargs)

    def _delete(self, path, **kwargs):
        return self._request("DELETE", path, **kwargs)

    def _request(self, method, path, **kwargs):
        url = "{}/api/{}".format(self.redash_url, path)
        response = self.session.request(method, url, **kwargs)
        response.raise_for_status()
        return response

    def test_credentials(self):
        try:
            response = self._get("session")
            return True
        except Exception as e:
            return False
```

Here we have defined a class `Redash` which takes in the `endpoint` and `api_key` as the arguments. We have defined some utility functions like `_get`, `_post`, `_put`, `_patch` and `_delete` which will be used to make the API calls. And they are using the `_request` function which will concatinate `endpoint`, `api`, `path` and finally makes the request. We have also defined a function `test_credentials` which will be used to test our Redash credential (kind of health check).

### Main Utility Functions

From here the main utility functions are specific to my use case but you can use them as a reference to build your own. My idea is to ask emailID of the user's redash account and list them all the groups they aren't part of. And then ask the user to select the groups they want to be part of.

So we need the following main functions:

1. `get_available_groups_for_user` to get all the groups the user isn't part of. As I couldn't find a readymade `api endpoint` for this we will require the following functions:
   - `get_all_groups` to get all the groups in the redash instance
   - `get_user_groups` to get all the groups the user is part of

```
def get_all_groups(self):
    response = self._get("groups")
    return response.json() # You can put try cache here as well for better error handeling.

def get_user_groups(self, email):
    try:
        path = f"users?page=1&page_size=1&q={email}"
        response = self._get(path)
        json_response = response.json()
        if(json_response["count"] > 0):
            return json_response["results"][0]["groups"]
        else:
            return []
    except Exception as e:
        return []
```

Using the above 2 functions we can get the list of all the groups the user isn't part of.

```
def get_available_groups_for_user(self, email):
    all_groups = self.get_all_groups()
    user_groups = self.get_user_groups(email)
    available_groups = []
    for group in all_groups:
        current_group = {'name': group['name'], 'id': group['id']} # we will be appending group id for the final function & name to display in dropdown
        if current_group not in user_groups:
            available_groups.append(current_group)
    return available_groups
```

2. And then, `post_user_in_that_group` to add the user to the selected group. As this POST request requires user_id not emailID, we need to get the user_id from the emailID. So we need this function as well:
   - `get_user_id` to get the user id of the user. It will also act as a check if the user got removed/deleted from redash after raising the request.

```
def get_user_id(self, email):
    try:
        path = f"users?page=1&page_size=1&q={email}"
        response = self._get(path)
        json_response = response.json()
        if(json_response["count"] > 0):
            return json_response["results"][0]["id"]
        else:
            return None
    except Exception as e:
        return None
```

Now as we have everything in place. We can finally `update` the requested group permission for the current user.

```
def post_user_in_that_group(self, email, group_id):
        try:
            user_id = self.get_user_id(email) # You can put a check here to go ahead only if user_id is not None
            path = f"groups/{group_id}/members"
            response = self._post(path, json={"user_id": user_id})
            return response.json()
        except Exception as e:
            raise e
```

## Putting it all together

The above functions can be called in frontend (`views.py` in my case) to carry out the permission updating tasks.

Suggestions and feedbacks are welcome.

Until next time, TaDa 👋

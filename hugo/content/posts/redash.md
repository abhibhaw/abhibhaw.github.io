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

Redash is such an amazing tool that literally helps you make sense of your data. If this is the first time you have encountered this word (I'm expecting you aren't): [Redash](https://redash.io/) is an opensource tool that helps you to connect and query your data sources, build some cool dashboards & graphs to visualize data and share them with your company.

We at our company are using the same to run tons of query across multiple datasources and teams. But as the team size keeps growing, it became difficult to manage and audit the permissions of the users.

Luckily we have our in-house permission management dashboard built over Django, where a user raises a request to get a particular permission and the manager aka approver verifies and approves the request. So we decided to add this Redash permission thing to the same flow.

## Process Begins

As stated above our dashboard is built over Django, the code examples below are in python, but you can use any language of your choice.

After going through the [Redash API docs](https://redash.io/help/user-guide/integrations-and-api/api/), our redash client network tab and few googling, I figured out that the redash API is pretty simple and straight forward. You just need to append `/api/` between your base url and route to get the API endpoint.

> ### For Example

> Let's say your redash client is accessible at: `https://redash.example.com/` and you are able to get the list of all the groups at: `https://redash.example.com/groups`, then the API endpoint would be: `https://redash.example.com/api/groups`

## The interesting part

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
            logger.error("some exception occurred-{}".format(str(e)))
            return False
```

Here we have defined a class `Redash` which takes in the `endpoint` and `api_key` as the arguments. We have defined some utility functions like `_get`, `_post`, `_put`, `_patch` and `_delete` which will be used to make the API calls. And they are using the `_request` function which will concatinate `endpoint`, `api`, `path` and finally makes the request. We have also defined a function `test_credentials` which will be used to test our Redash credential (kind of health check).

### Main Utility Functions

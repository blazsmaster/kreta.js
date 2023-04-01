---
name: Submit new endpoint
about: Briefly describe the new API endpoint that needs to be added.
title: "[API]"
labels: api
assignees: ''

---

## Details

Please provide the following details about the new API endpoint:

- HTTP method (GET, POST, PUT, DELETE)
- Base URL and endpoint URL
- Request parameters (if any)
- Request headers (if any)
- Response body type (string, number, boolean, array, object)
- Response format

*example:*
```json
{
  "method": "GET",
  "base_url": "https://{{institute_code}}.e-kreta.hu",
  "endpoint_url": "/ellenorzo/V3/Sajat/Ertekelesek",
  "params": {
    "datumTol": "lorem",
    "datumIg": "ipsum"
  },
  "headers": {
    "Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxx",
    "Content-Type": "application/json"
  },
  "response": [
    {
      "ErtekeloTanarNeve": "Lorem ipsum", 
      "Jelleg": "Lorem ipsum",
      ...
    },
    {
      ...
    }
  ]
}
```

## Errors

Please provide a list of possible errors that can occur when using the new API endpoint, along with their error codes and descriptions.

- 400 - Lorem ipsum
- 400 - Lorem ipsum
- 403 - Lorem ipsum

## Additional Context

Add any additional information or context that may be helpful for the development team.

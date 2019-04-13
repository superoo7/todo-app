# Get All Todos

GET /todos

Response:

```json
{
    "todos": [
        {
            "done": false,
            "description": "wqe Test 21",
            "uid": 21
        }
    ]
}
```

# Create

POST /todos

Request:

```json
{
    "done": false,
    "description": "wqe Test 21",
    "uid": 21
}
```

Response:

```json
{
    "success": true
}

```

# Delete

DELETE /todos

Request

```json
{
    "uid": 21
}
```

Response:

```json
{
    "success": true
}

```

# Edit

POST /todos/edit

Requst

```json
{
    "done": false,
    "description": "wqe Test 21",
    "uid": 21
}
```

Response:

```json
{
    "success": true
}

```
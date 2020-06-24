# Simple Diary API Spec

## JSON Objects returned by API:

### User
```
{
	"user": {
		"id": 1,
		"email": "yoneda@yoneda.com",
		"name": "yoneda",
		"showCalendar": true,
		"createdAt": "2020-5-1 10:00:00",
		"updatedAt": "2020-5-29 10:00:00"
	}
}
```
### Note
```
{
	"note": {
		"id": 1,
		"title": "my title",
		"body": "text text text",
		"createdAt": "2020-5-28 10:00:00",
		"updatedAt": "2020-5-29 10:00:00"
	}
}
```

### TrashedNote
```
{
	"note": {
		"id": 1,
		"title": "my title",
		"body": "text text text",
		"trashed": true,
		"createdAt": "2020-5-28 10:00:00",
		"updatedAt": "2020-5-29 10:00:00"
	}
}
```

## Endpoints:

### Login

`POST /api/users/login`

Example request body:
```
{
	"user":{
		"email": "yoneda@yoneda.com",
		"password": "yoneda"
	}
}
```
No authentication required, returns a [User](#User)

Required fields: `email`, `password`

### Logout

`POST /api/users/logout`

Authentication required

### Check Authentication
Check if your client has certificate for Simple Diary API.

`GET /api/checkAuth`

Authentication required, returns a [User](#User) and status code 200, when you didn't login, returnes 401 Unauthorized

### List Notes

`GET /api/notes`

Authentication required, returnes array of [Note](#Note), possessed by an authenticated user.

Query Parameters:

Get trashed notes (default is false):

`?trashed=true`

Limit number of notes (default is 10):

`?limit=10`

### Create a Note

`POST /api/notes`

Example request body:
```
{
	"note": {
		"title": "my title",
		"body": "text text text"
	}
}
```

Authentication required, return a [Note](#Note)

Required field: `body`

Optional field: `title`

### Edit a Note

`PUT /api/notes/:id`

Example request body:
```
{
	"note": {
		"title": "my title",
		"body": "text text text"
	}
}
```
Optional field: `title`, `body`.

### Trash a Note

`PUT /api/notes/:id/trash`

Authentication required, return a [TrashedNote](#TrashedNote)

### Restore a Note

`PUT /api/notes/:id/restore`

Authentication required, return a [TrashedNote](#TrashedNote)

### Delete a Note

`DELETE /api/notes/:id`

Authentication required

### Delete all trashed Notes

`DELETE /api/notes/garbage`

Authentication required

### Get a User

`GET /api/users`

Authentication required, return a certificated [User](#User)

### Create a User

`POST /api/users`

Example request body:
```
{
	"user":{
		"email": "yoneda@yoneda.com",
		"password": "yoneda"
	}
}
```
No authentication required, returns a [User](#User)

Required fields: `email`, `password`

### Update a User
`PUT /api/users`

Example request body:
```
{
	"user":{
		"name": "yoneda",
		"password": "yoneda",
		"showCalendar": false
	}
}
```
Authentication required, returns a [User](#User)

Optional fields: `name`, `password`, `showCalendar`

### Delete a User
`DELETE /api/users`

Authentication required
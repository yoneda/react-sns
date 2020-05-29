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
## Endpoints:

### Login

`POST /api/users/login`

Example request body:
```
{
	"user":{
		"mail": "yoneda@yoneda.com",
		"pass": "yoneda"
	}
}
```
No authentication required, returns a [User](#User)

Required fields: `mail`, `pass`

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

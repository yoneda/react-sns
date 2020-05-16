# Simple Diary API Spec

## JSON Objects returned by API:

### User
{
	"user": {
		"id": 1,
		"mail": "yoneda@yoneda.com",
		"bio": "hello",
		"showCalendar": true,
		"showDateEditor": false,
		"calendarStart": 0
	}
}

### Note
{
	"note": {
		"id": 1,
		"body": "text text text",
		"createdAt": "2020-5-5 10:00:00",
		"updatedAt": "2020-5-10 10:00:00",
	}
}

## Endpoints:
# Student Assignment API
This is node js api where user can register and login. And there are three user role ex: admin, mentor, student. Simply i am describing the app in short below.

**Admin Area**
- Can add/edit/delete, assessment, users, submissions and grades.

**Teacher**
- Teacher Registration
- Create Assignment
- Grade an Assignment

**Student**
- Student Registration
- Submit Assignment

The entire application is contained within the `src/app.js` file.
You will find all configuration in `./config/` folder
Migrations is defined on `src/migration/` folder

### Install
```
npm install
```
### Env
Copy all from `./.env.example` to your `.env` and define your configuration which is blank.

### Migration
Run your apache server as well as **mysql**. You can use **xampp** for this purpose. Then create your database which you defined on `.env`  file
```
npm run db:migrate
```

### Run the app
After successfully migration you can run the app.
```
npm run start:dev // for development server
npm start // for production
```
# Rest API
---
## Auth Routes
### Sign Up
##### Request
`POST /api/auth/signup`
```
{
   "email": "example@mail.com",
   "password": "12345",
   "name": "Example",
   "role": "student" // optional. Default: student
}
```

> You can't sign up as an **ADMIN**
> Admin can be added directly from database

##### Response
```
{
    "token": "...",
    "user": {...}
}
```

### Login
##### Request
`POST /api/auth/login`
```
{
    "email": "example@mail.com",
    "password": "12345",
}
```

##### Response
```
{
    "token": "...",
    "user": {...}
}
```
### `Admin Route`
---
Attaching **token** as header parameter (**Authorization**) what you get after login as an admin
```
Authorization: eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```
### Add User
##### Request
`POST /api/auth/user`
```
{
    "email": "example@mail.com",
    "password": "12345",
    "name": "Example",
    "role": "admin"
}
```
### Update user
##### Request
`PATCH /api/auth/user`

```
{
    "userId" : 1,
    "email": "example2@mail.com", // optional
    "role": "mentor", // optional
    "status": "banned" // optional
}
```

### Delete user
##### Request
`DELETE /api/auth/user/{user_id}`
##### Response
```
{ "message": "User deleted successfully!", "userId": 4 }
```

## Assignmet API
Attaching **token** as header parameter (**Authorization**) what you get after login. All routes based on permission on three different role i.e. admin, mentor, student.
```
Authorization: eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```
> **Admin has super power. Admin can access all routes**

### Create assignment
##### Request
`POST /api/assignment`
Permission: **admin, mentor**
```
{
    "title": "Build a CRUD application",
    "description": "Make a application where user can play add, read, edit and delete", // optional
    "deadline": "2022-07-15"
}
```
##### Response
```
{
    "message": "Assignment created",
    "assignment": {
        "id": 3,
        "title": "Build a CRUD application",
        "description": "Make a application where user can play add, read, edit and delete",
        "mentor": 15,
        "deadline": "2022-07-14T18:00:00.000Z",
        "createdAt": "2022-05-05T10:19:07.544Z"
    }
}
```
### Get all assignment
##### Request
`GET /api/assignment`
Permission: **admin**
##### Response
```
[
    {"id": 1, ...},
    {"id": 2, ...},
    {"id": 3, ...}
]
```

### Edit an assignment
##### Request
`PATCH /api/assignment`
Permission: **admin**
```
{
    "assignmentId": 1,
    "title": "New title", // optional
	"description": "New description", // optional
	"mentor": 4, // optional
	"deadline": "2022-07-13" // optional
}
```
##### Response
```
{
    "message": "Assignment updated",
	"assignment": {
        "id": 1,
       "title": "New title",
    	"description": "New description",
    	"mentor": 4,
    	"deadline": "2022-07-13"
        "createdAt": "2022-05-05T10:19:07.544Z"
    }
}
```
### Delete an assignment
##### Request
`DELETE /api/assignment/{assignment_id}`
Permission: **admin**
##### Response
```
{ "message": "Deleted successfully", "assignmentId": 1 }
```
### Make a submission
##### Request
`POST /api/assignment/submission`
Permission: **admin, student**
```
{
    "assignmentId": 1,
    "link": "https://example.com/read"
}
```
> You can attach a file instead of link as a form data

##### Response
```
{
    "message": "Assignment submitted",
    "submission": {
         "id": 4,
        "assignmentId": "1",
        "submittedBy": 9,
        "link": "https://example.com/read",
        "updatedAt": "2022-05-05T10:36:47.740Z"
    }
}
```
### Get all submission
##### Request
`GET /api/assignment/submission`
Permission: **admin, mentor, student**
##### Response
```
[
    {"id": 1, ...},
    {"id": 2, ...},
    {"id": 3, ...}
]
```
> Admin & Mentor will get all submissions. But student will get only their submission

### Edit a submission
##### Request
`PATCH /api/assignment/submission`
Permission: **admin**
```
{
    "submissionId": 1,
    "link": "https://example.com/book" // optional
}
```
##### Response
```
{
    "message": "Submission updated",
    "submission": {
        "id": 4,
        "assignmentId": 3,
        "submittedBy": 9,
        "file": null,
        "link": "https://example.com/book",
        "updatedAt": "2022-05-05T10:36:47.000Z"
    }
}
```
### Delete a submission
##### Request
`DELETE /api/assignment/submission/{submission_id}`
Permission: **admin**
##### Response
```
{ "message": "Deleted successfully", "submissionId": 4 }
```

### Grade an assignment
##### Request
`PATCH /api/assignment/grade`
Permission: **admin, mentor**
```
{
    "submissionId": 4,
    "mark": 8,
    "remark": "Should be improved" //optional
}
```
##### Response
```
{
    "message": "Grade updated",
    "grade": {
        "id": 1,
        "submissionId": 4,
        "mark": "8",
        "createdAt": "2022-05-05T11:07:05.776Z",
        "remark": "Should be improved"
    }
}
```

### Delete a grade
##### Request
`DELETE /api/assignment/grade/{grade_id}`
Permission: **admin**
##### Response
```
{
    "message": "Deleted successfully",
    "gradeId": "3"
}
```



**voilà. Have a fun!**

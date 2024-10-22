# MyBaseCamp Backend

## Features implemented

- **User Registration**: Users can create an account.
- **User Login/Logout**: Users can log in and out, and sessions are managed using `express-session`.
- **Role-Based Access Control**: Users can be promoted to admin by other admins. Admins have special privileges like promoting users and managing projects.
- **Project Management**: Users can create, view, update, and delete projects. Only the owner of a project (or an admin) can edit or delete it.
- **Secure Authentication**: Passwords are hashed using `bcrypt`.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and project information.
- **Mongoose**: MongoDB object modeling tool.
- **bcrypt**: Library for password hashing.
- **express-session**: Middleware for session management.
- **connect-mongo**: MongoDB-based session store for `express-session`.
- **express-validator**: Middleware for input validation.
- **express-rate-limit**: Middleware to rate limit certain routes (e.g., login).

## User Routes used

POST /api/users/register – Register a new user.
--{
  "username": "JohnDoe",
  "email": "<john@example.com>",
  "password": "password123"
}--

POST /api/users/login – Log in an existing user
--{
  "email": "<john@example.com>",
  "password": "password123"
}--

GET /api/users/logout – Log out the currently logged-in user.

POST /api/users/admin/:id – Promote a user to admin (admin only).

POST /api/users/removeAdmin/:id – Remove admin privileges from a user (admin only).

DELETE /api/users/delete/:id – Delete a user (self or admin).

## Project Routes used

POST /api/projects – Create a new project.
--{
  "name": "My Project",
  "description": "This is my project description"
}--

GET /api/projects – Get all projects for the current user.

PUT /api/projects/:id – Update an existing project (owner or admin only).
--{
  "name": "Updated Project Name",
  "description": "Updated Project Description"
}--

DELETE /api/projects/:id – Delete an existing project (owner or admin only).

## Whats left to do

- **ENV setup(for mongoDB string)**

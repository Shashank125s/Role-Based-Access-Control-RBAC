# Role-Based Access Control (RBAC) Application

This project implements a **Role-Based Access Control (RBAC)** system with user authentication and authorization using **Node.js**, **Express**, **MongoDB**, and **EJS**. The application features multiple user roles, including **User**, **Moderator**, and **Admin**, each with specific access privileges.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Routes](#routes)
- [User Roles & Permissions](#user-roles--permissions)

---

## Technologies Used

This application utilizes the following technologies:

### Backend
- **Node.js**: A JavaScript runtime for building scalable and efficient server-side applications.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js to handle HTTP requests, route requests to appropriate controllers, and manage middleware.
- **MongoDB**: A NoSQL database for storing user information, activity logs, and roles. MongoDB is a document-oriented database that stores data in JSON-like format, making it a good choice for flexible data storage.
- **Mongoose**: A MongoDB object modeling tool for Node.js, used to define models for User and ActivityLog schemas, and manage interactions with MongoDB.

### Frontend
- **EJS (Embedded JavaScript Templates)**: A templating engine used to render HTML pages on the server side and embed JavaScript logic inside HTML templates.
- **Tailwind CSS**: A utility-first CSS framework used for styling the frontend of the application. It helps create responsive, flexible layouts with minimal custom CSS.
- **Multer**: Middleware for handling `multipart/form-data`, used for uploading files, such as profile pictures.

### Authentication & Authorization
- **express-session**: Used to manage session data on the server, allowing user authentication and maintaining sessions across requests.
- **bcrypt**: A library for hashing passwords securely before storing them in the database, preventing plain-text password storage.
  
---

## Features

- **User Authentication & Authorization**: Secure login and registration system with role-based access.
- **Role-Based Access Control**: Different resources are accessible based on the user's role (User, Moderator, Admin).
- **Admin Dashboard**: Admin users can view and manage users and moderators.
- **Activity Logs**: Tracks user actions (login, logout, resource access).
- **Responsive Design**: The app uses **Tailwind CSS** to ensure that the application is mobile-friendly and responsive.

---

## Tech Stack

- **Backend**: 
  - **Node.js**: Handles server-side logic, routes, and sessions.
  - **Express.js**: Manages HTTP requests, middleware, and route handling.
  
- **Database**:
  - **MongoDB**: Stores user data, roles, and activity logs.
  - **Mongoose**: Object Data Modeling (ODM) library used to interact with MongoDB and define the User and ActivityLog schemas.

- **Frontend**:
  - **EJS (Embedded JavaScript)**: A templating engine used to render dynamic HTML views.
  - **Tailwind CSS**: Used for utility-first styling to create responsive layouts.

- **Authentication**:
  - **express-session**: Manages sessions and ensures users are logged in before accessing certain routes.
  - **bcrypt**: Ensures secure password storage and comparison during login.



---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rbac-application.git
cd rbac-application
```

Application Structure
```
/rbac-application
├── /controllers
│   ├── authController.js      # Handles authentication, registration, and logout
│   └── activityLogController.js  # Handles activity log viewing and creation
├── /middleware
│   └── auth.js               # Middleware for checking user authentication and roles
├── /models
│   ├── User.js               # User schema
│   └── ActivityLog.js        # Activity log schema
├── /public
├── /views
│   ├── dashboard.ejs         # Dashboard page for users, moderators, and admins
│   ├── index.ejs             # Landing page for users not logged in
│   ├── login.ejs             # Login page
│   ├── register.ejs          # Registration page
│   ├── viewUsers.ejs         # Admin page to view all users and moderators
│   └── activityLogs.ejs      # Admin page to view activity logs
├── /node_modules
├── .env                      # Environment variables (if used for MongoDB or session secrets)
├── package.json              # Application dependencies and scripts
└── server.js                 # Main application entry point
```

## Routes

### Authentication & Authorization

- **GET `/login`**: Displays the login form.
- **POST `/login`**: Logs in the user.
- **GET `/register`**: Displays the registration form.
- **POST `/register`**: Registers a new user.
- **GET `/logout`**: Logs the user out.

### Role-Based Access

- **GET `/dashboard`**: Displays the user’s dashboard (accessible by all logged-in users).
- **GET `/userResource`**: User-specific resources (accessible by users, moderators, and admins).
- **GET `/moderatorResource`**: Moderator-specific resources (accessible by moderators and admins).
- **GET `/adminResource`**: Admin-specific resources (accessible by admins only).
- **GET `/admin/viewUsers`**: Admin can view all users and moderators.
- **GET `/activityLogs`**: Admin can view activity logs for all users.


---

## User Roles & Permissions

### User Roles

- **User**: Can access basic user resources.
- **Moderator**: Can access moderator resources and manage user-generated content.
- **Admin**: Can access admin resources, manage users and moderators, and view activity logs.

### Access Control

Each route is protected by role-based middleware:

- **`isAuthenticated`**: Ensures that the user is logged in.
- **`hasRole(requiredRole)`**: Ensures the user has the correct role to access specific routes.

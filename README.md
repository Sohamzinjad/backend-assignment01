# Task Management API

A RESTful backend service for managing tasks, built with Node.js, Express.js, and MongoDB. Includes JWT-based authentication so each user can manage their own tasks.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (jsonwebtoken + bcryptjs)
- **Validation:** express-validator

## Project Structure

```
backend/
├── config/         # Database configuration
├── controllers/    # Route handler logic
├── middleware/      # Auth middleware
├── models/         # Mongoose schemas
├── routes/         # Express route definitions
├── server.js       # App entry point
└── .env            # Environment variables
```

## Installation

```bash
git clone <repo-url>
cd backend
npm install
```

## Environment Variables

Create a `.env` file in the `backend/` directory:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key_change_this
```

| Variable       | Description                          |
| -------------- | ------------------------------------ |
| `PORT`         | Server port (default: `3000`)        |
| `MONGODB_URI`  | MongoDB connection string            |
| `JWT_SECRET`   | Secret key for signing JWT tokens    |

## Running the Server

Make sure MongoDB is running, then:

```bash
# Production
npm start

# Development (auto-restart on file changes)
npm run dev
```

The server starts at `http://localhost:3000`.

---

## API Endpoints

### Auth

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/auth/register   | Register new user |
| POST   | /api/auth/login      | Login user        |

### Tasks (require `Authorization: Bearer <token>` header)

| Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| POST   | /api/tasks             | Create a task            |
| GET    | /api/tasks             | Get all user's tasks     |
| GET    | /api/tasks/:id         | Get a single task        |
| PUT    | /api/tasks/:id         | Update a task            |
| DELETE | /api/tasks/:id         | Delete a task            |
| PATCH  | /api/tasks/:id/status  | Update task status       |

---

## Task Object Schema

| Field         | Type     | Description                          |
| ------------- | -------- | ------------------------------------ |
| `_id`         | ObjectId | Auto-generated unique ID             |
| `title`       | String   | Task title (required)                |
| `description` | String   | Task description (default: `""`)     |
| `status`      | String   | `"pending"` or `"completed"`         |
| `dueDate`     | Date     | Optional due date (default: `null`)  |
| `user`        | ObjectId | Reference to the owning user         |
| `createdAt`   | Date     | Auto-generated timestamp             |

---

## Sample Requests & Responses

### Register

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Create Task

```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Finish project report",
  "description": "Complete the final section and submit",
  "dueDate": "2026-03-15"
}
```

**Response (201):**

```json
{
  "_id": "665f1b2c3d4e5f6a7b8c9d0e",
  "title": "Finish project report",
  "description": "Complete the final section and submit",
  "status": "pending",
  "dueDate": "2026-03-15T00:00:00.000Z",
  "user": "665f1a2b3c4d5e6f7a8b9c0d",
  "createdAt": "2026-03-05T10:30:00.000Z",
  "__v": 0
}
```

### Update Task Status

```
PATCH /api/tasks/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

**Response (200):**

```json
{
  "_id": "665f1b2c3d4e5f6a7b8c9d0e",
  "title": "Finish project report",
  "description": "Complete the final section and submit",
  "status": "completed",
  "dueDate": "2026-03-15T00:00:00.000Z",
  "user": "665f1a2b3c4d5e6f7a8b9c0d",
  "createdAt": "2026-03-05T10:30:00.000Z",
  "__v": 0
}
```

### Delete Task

```
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "message": "Task deleted"
}
```

---

## Testing with Postman

Import `Task_Manager_API.postman_collection.json` into Postman to test all endpoints. The collection includes pre-configured requests for auth and task operations.

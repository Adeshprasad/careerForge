# CareerForge

CareerForge is a backend-heavy MERN application designed to help users track, manage, and organize their job applications in one place.

The project is being built from scratch with a focus on understanding backend architecture, REST API design, authentication, database modeling, validation, error handling, file uploads, and frontend integration rather than simply assembling features.

---

## Features

### Authentication & Security

- User registration and login
- JWT-based authentication
- Protected API routes
- User-specific application data
- Request validation
- Resource ownership checks
- Global error handling

### Application Management

- Create job applications
- View all applications
- View individual application details
- Update applications
- Delete applications
- Search applications by company
- Filter applications by status
- Filter applications by date range
- Sort applications
- Pagination
- Pagination limit protection

### Application Tracking

- Track application status
- Maintain status history
- Add notes to applications
- Set follow-up dates
- Retrieve upcoming follow-ups
- Application analytics

### Resume Management

- Upload resumes
- PDF-only file validation
- Resume file size limits
- View uploaded resumes
- User-specific resume access

### Interview Management

- Add interviews to applications
- Track interview rounds
- Track interview dates
- Track interview types
- Track interview outcomes
- Add interview notes
- Update interviews
- Delete interviews

### Frontend

- React component-based architecture
- Reusable components
- React state management
- Controlled form inputs
- Dynamic list rendering
- Application details view
- Interview management UI

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Multer

### Frontend

- React
- Vite
- JavaScript

### Development & Testing

- Postman
- Git & GitHub

---

## Project Structure

```text
careerForge/
│
├── src/
│   ├── app.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── applicationController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── validation/
│   │       └── applicationValidation.js
│   │
│   ├── models/
│   │   ├── Application.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   └── user/
│   │       └── userRoutes.js
│   │
│   └── utils/
│       └── asyncHandler.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── assets/
│       ├── App.jsx
│       └── main.jsx
│
├── uploads/
│   └── .gitkeep
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Prerequisites

Before running CareerForge, make sure you have:

- Node.js installed
- npm installed
- A MongoDB database
  - Local MongoDB installation, or
  - MongoDB Atlas account
- Git
- Postman (optional, for API testing)

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd careerForge
```

Replace `<repository-url>` with the URL of your GitHub repository.

---

### 2. Install backend dependencies

From the project root:

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string_here

JWT_SECRET=your_jwt_secret_here
```

Do not commit `.env` to Git.

A `.env.example` file is included in the repository as a reference.

---

### 4. Start the backend

From the project root:

```bash
node src/app.js
```

The backend will run on:

```text
http://localhost:3000
```

You should see messages indicating that the server has started and MongoDB has connected successfully.

---

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

### 6. Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

Open that URL in your browser.

---

## Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| `PORT` | Port used by the Express server |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWT tokens |

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
```

---

## API Overview

All protected application routes require a JWT token.

The token should be provided using the `Authorization` header:

```text
Authorization: Bearer <token>
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Login and receive a JWT |

### Applications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/applications` | Fetch applications |
| GET | `/applications/:id` | Fetch one application |
| POST | `/applications` | Create an application |
| PATCH | `/applications/:id` | Update an application |
| DELETE | `/applications/:id` | Delete an application |

### Application Features

| Method | Endpoint | Description |
|---|---|---|
| GET | `/applications/analytics` | Get application analytics |
| GET | `/applications/followups` | Get upcoming follow-ups |
| GET | `/applications/:id/resume` | View application resume |

### Interviews

| Method | Endpoint | Description |
|---|---|---|
| POST | `/applications/:id/interviews` | Add an interview |
| PATCH | `/applications/:id/interviews/:interviewId` | Update an interview |
| DELETE | `/applications/:id/interviews/:interviewId` | Delete an interview |

---

## Application Query Features

The applications endpoint supports several query parameters.

### Filter by status

```text
GET /applications?status=Interview
```

Supported statuses:

```text
Applied
Interview
Rejected
Offer
```

### Search by company

```text
GET /applications?company=Microsoft
```

Company search is case-insensitive.

### Filter by date range

```text
GET /applications?from=2026-08-01&to=2026-08-31
```

Either `from`, `to`, or both can be provided.

### Pagination

```text
GET /applications?page=1&limit=10
```

The API returns pagination metadata including:

- Current page
- Limit
- Total applications
- Total pages
- Whether a next page exists
- Whether a previous page exists

The maximum page size is limited to 50 applications.

### Sorting

```text
GET /applications?sort=createdAt
```

or:

```text
GET /applications?sort=-createdAt
```

---

## Testing

API endpoints can be tested using Postman.

The application has been tested for:

- User registration
- User login
- Protected routes
- Application creation
- Application retrieval
- Application updates
- Application deletion
- Application search
- Status filtering
- Date filtering
- Sorting
- Pagination
- Invalid pagination values
- Invalid dates
- Invalid status values
- Invalid sort values
- Invalid application IDs
- Missing applications
- Resume uploads
- Interview creation
- Interview updates
- Interview deletion
- Invalid/non-existent interview IDs
- Error handling

---

## File Uploads

CareerForge supports resume uploads using Multer.

Currently:

- Only PDF files are accepted
- Uploaded files are stored locally during development
- Resume files are excluded from Git using `.gitignore`
- The `uploads/.gitkeep` file keeps the upload directory present in the repository

Uploaded resumes should not be committed to Git.

---

## Error Handling

The backend uses centralized error handling to provide consistent API responses.

Example:

```json
{
    "success": false,
    "message": "Application not found"
}
```

Validation errors return appropriate HTTP status codes instead of allowing invalid data to reach the database.

---

## Development Approach

CareerForge is being developed incrementally, with each stage focusing on a specific aspect of full-stack development.

The project emphasizes:

- Understanding backend architecture
- Designing REST APIs
- MongoDB data modeling
- Authentication and authorization
- Input validation
- Error handling
- File uploads
- Pagination
- Filtering and sorting
- Status tracking
- Interview tracking
- Frontend-backend integration
- API testing
- Edge-case handling
- Clean project structure

The goal is to understand how the pieces of a full-stack application work together rather than simply assembling a collection of features.

---

## Current Status

CareerForge currently has a functional backend and React frontend with application tracking, authentication, resume management, interview tracking, filtering, pagination, analytics, follow-ups, validation, and error handling implemented.

UI/UX improvements are being developed separately from backend functionality.
# next-todo

Full-stack todo application with **Next.js** (SSR) frontend and **Express + MongoDB** backend.

## Features

- User registration and login (JWT authentication)
- Protected dashboard routes (middleware + cookies)
- Todo CRUD — create, read, update, delete
- Server-side rendering (SSR) with Server Actions
- Responsive UI with Tailwind CSS

## Tech Stack

| Layer    | Technologies                                      |
|----------|---------------------------------------------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS  |
| Backend  | Node.js, Express 5, MongoDB, Mongoose, JWT      |
| Auth     | JWT, HTTP-only cookies, Next.js middleware        |

## Project Structure

```
next-todo/
├── frontend/          # Next.js app (SSR)
│   ├── app/           # Pages, layouts, server actions
│   ├── components/    # UI components
│   └── lib/           # Server API helpers, auth
├── backend/           # Express API
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/SachinFlynaut11/next-todo.git
cd next-todo
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example src/.env
# Edit src/.env with your MONGO_URI and JWT_SECRET
npm start
```

Backend runs at **http://localhost:5000**

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at **http://localhost:3000**

## API Endpoints

| Method | Endpoint           | Auth | Description        |
|--------|--------------------|------|--------------------|
| POST   | `/api/auth/register` | No   | Register user      |
| POST   | `/api/auth/login`    | No   | Login, get token   |
| GET    | `/api/todos`         | Yes  | List user todos    |
| POST   | `/api/todos`         | Yes  | Create todo        |
| PUT    | `/api/todos/:id`     | Yes  | Update todo        |
| DELETE | `/api/todos/:id`     | Yes  | Delete todo        |

## Scripts

### Backend

| Command       | Description              |
|---------------|--------------------------|
| `npm start`   | Start dev server (nodemon) |
| `npm run build` | Compile TypeScript     |

### Frontend

| Command         | Description           |
|-----------------|-----------------------|
| `npm run dev`   | Start development     |
| `npm run build` | Production build      |
| `npm start`     | Start production      |

## Author

[SachinFlynaut11](https://github.com/SachinFlynaut11)

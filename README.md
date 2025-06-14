# Watch Service Website

This repository contains a simple full-stack Watch Service web application.

## Features
- React frontend styled with Tailwind CSS.
- Node.js + Express backend connected to MongoDB.
- Users can book watch services and track status.
- Admins can manage service requests.

## Getting Started
1. Install dependencies for both frontend and backend:

```bash
cd frontend && npm install
cd ../backend && npm install
```

2. Copy `.env.sample` to `.env` in both `frontend` and `backend` folders and fill in the values.

3. Start the development servers:

```bash
# In one terminal
cd backend && npm run dev

# In another terminal
cd frontend && npm run dev
```

The frontend runs on <http://localhost:5173> and the backend on <http://localhost:5000>.

## Folder Structure
- `frontend/` – React app using Vite and Tailwind CSS.
- `backend/` – Express API server using Mongoose.


# Todo App – Monorepo

This repository contains both the **Laravel 12 backend API** and the **Vue 3 + Vite frontend SPA** for a modern, full-stack To-Do List application.

---

## Project Structure

```
todoapp/
  backend/   # Laravel 12 REST API
  frontend/  # Vue 3 + Vite SPA
```

---

## Prerequisites

- **PHP 8.2+** (for backend)
- **Composer** (for backend dependencies)
- **Node.js (v18+) & npm** (for frontend)
- **PostgreSQL** or **SQLite** (for backend database)
- **DDEV** (optional, for local dev containers)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/shayanabbas/todo.git
cd todoapp
```

---

## Backend Setup (`backend/`)

1. **Install PHP dependencies:**
   ```bash
   cd backend
   composer install
   ```

2. **Copy and configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` to set your database connection (PostgreSQL or SQLite).
   - Generate the application key:
     ```bash
     php artisan key:generate
     ```

3. **Run database migrations:**
   ```bash
   php artisan migrate
   ```

4. **(Optional) Seed the database:**
   ```bash
   php artisan db:seed
   ```

5. **Start the backend server:**
   - With DDEV (recommended):
     ```bash
     ddev start
     ddev ssh
     php artisan serve --host=0.0.0.0 --port=8080
     ```
     The API will be available at `http://localhost:8080` or `https://todoapp.ddev.site/`
   - Or without DDEV:
     ```bash
     php artisan serve
     ```

---

## Frontend Setup (`frontend/`)

1. **Install Node.js dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Copy and configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` to set your API endpoint (e.g., `VITE_API_URL=http://localhost:8080/api` or `VITE_API_URL=https://todoapp.ddev.site/api`).

3. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or as shown in your terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## Usage

- **Access the frontend:**  
  Open [http://localhost:5173](http://localhost:5173) in your browser.
- **API base URL:**  
  The frontend expects the backend API at the URL set in your `.env` (e.g., `VITE_API_URL`).

---

## Features

- User authentication (token-based, Laravel Sanctum)
- Task CRUD and recursive task hierarchy
- RESTful API (backend)
- Modern SPA with Vue 3, Pinia, Tailwind CSS, and Iconify (frontend)
- Dark mode support

---

## Development Notes

- The frontend is functional with API integrated.
- The backend is API-only (no web views except Laravel default).
- See `backend/README.md` and `frontend/README.md` for more details on each part.

---

## License

MIT

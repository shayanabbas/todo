# Laravel Backend API

This is the **backend API** for the Todo App, built with Laravel 12 and designed to be used as a RESTful service for a standalone frontend (such as a Vue 3 SPA).

---

## Features

- **User Authentication** (token-based, via Laravel Sanctum)
- **Task Management** (CRUD for tasks)
- **Recursive Task Hierarchy** (parent-child relationships)
- **RESTful API** endpoints only (no web views)
- **PostgreSQL** (or SQLite) support

---

## Requirements

- PHP 8.2+
- Composer
- Node.js (for development assets, optional)
- PostgreSQL (or SQLite for local development)
- DDEV (recommended for local dev, but not required)

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/shayanabbas/todo.git
cd todo/backend
```

### 2. Install PHP Dependencies

```sh
composer install
```

### 3. Environment Configuration

Copy the example environment file and edit as needed:

```sh
cp .env.example .env
```

- Set your database connection (PostgreSQL or SQLite) in `.env`:
  - For SQLite (default):  
    ```
    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/backend/database/database.sqlite
    ```
  - For PostgreSQL:
    ```
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=your_db
    DB_USERNAME=your_user
    DB_PASSWORD=your_password
    ```

- Generate the application key:
  ```sh
  php artisan key:generate
  ```

### 4. Run Migrations

```sh
php artisan migrate
```

This will create the necessary tables for users, tasks, and personal access tokens.

### 5. (Optional) Seed the Database

If you have seeders, run:

```sh
php artisan db:seed
```

### 6. Run the Application

#### With DDEV (recommended)

From the project root:

```sh
ddev start
ddev ssh
php artisan serve --host=0.0.0.0 --port=8080
```

Your API will be available at `http://localhost:8080` (or the DDEV-provided URL).

#### Without DDEV

```sh
php artisan serve
```

---

## API Endpoints

All endpoints (except `/api/login`) require authentication via a Bearer token.

### **Authentication**

- `POST /api/login`
  - Body: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "token": "..." }`

### **Tasks**

- `GET /api/tasks` — List all tasks for the authenticated user
- `POST /api/tasks` — Create a new task
- `GET /api/tasks/{id}` — Get a single task
- `PUT /api/tasks/{id}` — Update a task
- `DELETE /api/tasks/{id}` — Delete a task
- `GET /api/tasks-tree` — Get the full recursive task tree for the user

**All requests (except login) require:**
```
Authorization: Bearer <token>
```

---

## Database Schema

### **tasks**

| Field       | Type      | Description                        |
|-------------|-----------|------------------------------------|
| id          | bigint    | Primary key                        |
| user_id     | bigint    | Foreign key to users               |
| parent_id   | bigint    | Nullable, parent task (recursive)  |
| title       | string    | Task title                         |
| description | text      | Task description (nullable)        |
| priority    | enum      | 'high', 'medium', 'low' (default)  |
| label       | string    | Optional label                     |
| completed   | boolean   | Task completion status             |
| timestamps  |           | created_at, updated_at             |

---

## Development

- **Testing:**  
  Run tests with:
  ```sh
  php artisan test
  ```

- **API Docs:**  
  See the routes in `routes/api.php`.

---

## Notes

- This backend is **API-only**. No web views are provided.
- Use a separate frontend (e.g., Vue 3 SPA) to interact with this API.

---

## License

MIT

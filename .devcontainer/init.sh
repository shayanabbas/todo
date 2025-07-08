#!/bin/bash

set -e

PROJECT_DIR="/workspaces/todo"

# Clone if code doesn't exist (optional)
if [ ! -d "$PROJECT_DIR/backend" ]; then
    echo "Cloning repo..."
    git clone https://github.com/shayanabbas/todo.git "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"

### --- BACKEND SETUP ---
echo "Setting up Laravel backend..."

cd backend

cp -n .env.example .env

composer install

php artisan key:generate

# Wait for Postgres to be ready
echo "Waiting for Postgres to be ready..."
until pg_isready -h db -p 5432 -U db; do
  sleep 1
done
echo "Postgres is ready!"

sudo php artisan migrate

### --- FRONTEND SETUP ---
echo "Setting up Vue frontend..."

cd ../frontend

cp -n .env.example .env

# Set VITE_API_URL if not already set
if ! grep -q "VITE_API_URL=" .env; then
    echo "VITE_API_URL=http://localhost:8080/api" >> .env
fi

npm install

### --- DONE ---
echo "	Backend: http://localhost:8080"
echo "	Frontend: http://localhost:5173"

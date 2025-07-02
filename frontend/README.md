# Vue 3 + Vite To-Do App (Frontend)

This project is the frontend for a To-Do List application, built with Vue 3, Vite, Tailwind CSS, Pinia, and Iconify. The current state is a presentational UI template, ready for future integration with backend APIs and state management.

## Tech Stack
- **Framework:** Vue 3 (`<script setup>` SFCs)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (dark mode via `class`)
- **State Management:** Pinia
- **Routing:** Vue Router
- **Icons:** Iconify
- **HTTP Client:** Axios
- **Component Primitives:** Headless UI
- **Linting/Formatting:** ESLint, Prettier

## Directory Structure
- `src/components/` — Presentational UI components (Topbar, Sidebar, TaskCard, TaskModal, ThemeToggle, UserAvatarMenu, etc.)
- `src/stores/` — Pinia stores (`auth`, `user`, `task`, `theme`)
- `src/composables/` — Reusable logic (`useTaskModal`, `useAsyncState`, `useGroupedTasks`)
- `src/api/` — API integration layer (`index.js`)
- `src/router/` — Vue Router setup (`index.js`)
- `src/utils/` — Utility functions (`index.js`)
- `src/assets/` — Static assets (e.g., `vue.svg`)
- `src/main.js` — App entry point
- `src/App.vue` — Main app shell (presentational/template only)
- `style.css` — Global styles

## First-Time Setup

1. **Copy the example environment file and configure variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to set your API endpoints and any other required variables.

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Key Dependencies
- `vue`, `vue-router`, `pinia`, `axios`, `@iconify/vue`, `@headlessui/vue`, `tailwindcss`, `@tailwindcss/vite`, `vite`, `eslint`, `prettier`

## Tailwind CSS
- Configured for dark mode via `class`
- Scans all Vue and JS/TS files in `src/` and `index.html`

## Usage
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Preview the production build:**
   ```bash
   npm run preview
   ```


import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Placeholder }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
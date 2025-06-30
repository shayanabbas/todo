import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import SettingsPage from '../components/SettingsPage.vue';
import TasksPage from '../components/TasksPage.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/settings', component: SettingsPage },
  { path: '/tasks', component: TasksPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
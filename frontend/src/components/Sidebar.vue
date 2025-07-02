<script setup>
import { Icon } from '@iconify/vue';
import { useUserStore } from '../stores/user';
import { computed, onMounted, defineEmits } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useThemeStore } from '../stores/theme';
import { useTaskStore } from '../stores/task';
import UserAvatarMenu from './UserAvatarMenu.vue';

const emit = defineEmits(['logout']);
const user = useUserStore();
const route = useRoute();
const themeStore = useThemeStore();
const taskStore = useTaskStore();

onMounted(() => {
  if (!user.name) user.fetchProfile();
  if (taskStore.tasks.length === 0 && !taskStore.loading) taskStore.fetchTasks();
});

const uncompletedCount = computed(() => taskStore.tasks.filter(t => !t.completed).length);

function handleLogout() {
  emit('logout');
}
</script>

<template>
  <a href="#main-content" class="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-blue-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Skip to main content</a>
  <aside class="h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg flex flex-col justify-between fixed left-0 top-0 z-20">
    <div>
      <!-- Logo -->
      <div class="flex items-center gap-2 px-8 py-8">
        <div class="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
          <span class="text-white font-extrabold text-2xl">T</span>
        </div>
        <span class="text-blue-700 font-extrabold text-2xl tracking-tight">Tasks</span>
      </div>
      <nav class="mt-2" aria-label="Main navigation" role="navigation">
        <h2 class="sr-only">Main navigation</h2>
        <ul class="space-y-2">
          <li>
            <RouterLink to="/" class="flex items-center gap-4 px-8 py-3 font-semibold rounded-lg transition group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" :class="[$route.path === '/' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900' : 'text-gray-900 dark:text-gray-100', $route.path === '/' ? 'font-bold' : '']" aria-current="$route.path === '/' ? 'page' : undefined">
              <span v-if="$route.path === '/'" class="absolute left-0 top-0 h-full w-1 rounded-r bg-blue-600 dark:bg-blue-400" style="display: block;"></span>
              <Icon icon="material-symbols:dashboard-outline" class="w-6 h-6" :class="$route.path === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'" aria-hidden="true" />
              <span class="group-hover:text-blue-600 dark:group-hover:text-blue-400">Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/tasks" class="flex items-center gap-4 px-8 py-3 font-semibold rounded-lg transition group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" :class="[$route.path === '/tasks' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900' : 'text-gray-900 dark:text-gray-100', $route.path === '/tasks' ? 'font-bold' : '']" aria-current="$route.path === '/tasks' ? 'page' : undefined">
              <span v-if="$route.path === '/tasks'" class="absolute left-0 top-0 h-full w-1 rounded-r bg-blue-600 dark:bg-blue-400" style="display: block;"></span>
              <Icon icon="material-symbols:list-alt" class="w-6 h-6" :class="$route.path === '/tasks' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'" aria-hidden="true" />
              <span class="group-hover:text-blue-600 dark:group-hover:text-blue-400">Tasks</span>
              <span v-if="uncompletedCount > 0" class="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold dark:bg-blue-400 dark:text-gray-900" aria-label="{{ uncompletedCount }} uncompleted tasks">{{ uncompletedCount }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="px-4 py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2 bg-white dark:bg-gray-900">
      <!-- User info section -->
      <div class="flex flex-col items-center gap-2 py-8">
        <UserAvatarMenu :compact="false" @logout="handleLogout" />
      </div>
    </div>
  </aside>
</template>
 
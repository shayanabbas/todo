<script setup>
import { computed } from 'vue';
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.theme === 'dark');

function toggleTheme() {
  themeStore.toggleTheme();
}
</script>

<template>
  <button
    @click="toggleTheme"
    :aria-pressed="isDark"
    class="relative w-14 h-8 rounded-full flex items-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-gray-200 dark:bg-gray-700"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    aria-label="Toggle dark mode"
  >
    <!-- Sun icon (left, always visible) -->
    <span class="absolute left-2 top-2 text-yellow-400 dark:text-gray-400 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95-7.07l-.71.71M7.05 4.93l-.71-.71" /></svg>
    </span>
    <!-- Moon icon (right, always visible) -->
    <span class="absolute right-2 top-2 text-gray-400 dark:text-yellow-400 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
    </span>
    <!-- Sliding knob -->
    <span
      class="absolute left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow transition-transform duration-300 z-10"
      :class="isDark ? 'translate-x-6' : ''"
    ></span>
  </button>
</template> 
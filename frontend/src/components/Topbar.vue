<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import ThemeToggle from './ThemeToggle.vue';
import UserAvatarMenu from './UserAvatarMenu.vue';

const menuTitle = computed(() => 'My Lists');

</script>

<template>
  <header class="flex items-center justify-between h-16 px-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-30 w-full">
      <div class="flex items-center gap-8">
        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-6" aria-label="Main navigation">
          <span class="flex flex-col items-center px-2 text-blue-700 dark:text-blue-300 font-bold border-b-2 border-blue-700 dark:border-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-default">{{ menuTitle }}</span>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <ThemeToggle />
        <button @click="openAddModal" aria-label="Add new task" class="ml-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2 rounded-lg shadow-lg transition flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <Icon icon="material-symbols:add" class="w-5 h-5" aria-hidden="true" />
          <span>New Task</span>
        </button>
        <UserAvatarMenu compact placement="bottom" />
      </div>
  </header>
</template>
 
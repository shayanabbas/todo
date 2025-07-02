<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { RouterLink, useRouter } from 'vue-router';

const props = defineProps({
  compact: Boolean, // If true, only show avatar (for Topbar)
  placement: {
    type: String,
    default: 'top-right',
  },
});
const emit = defineEmits(['logout']);
const user = useUserStore();
const showDropdown = ref(false);
const router = useRouter();

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
function closeDropdown() {
  showDropdown.value = false;
}
function handleLogout() {
  emit('logout');
  closeDropdown();
}
function goToSettings() {
  closeDropdown();
  router.push('/settings');
}
</script>

<template>
  <div class="relative" @keydown.esc="closeDropdown">
    <img
      :src="user.profileImageUrl"
      @click="toggleDropdown"
      class="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-blue-700 shadow cursor-pointer object-cover aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      alt="User profile image"
      tabindex="0"
      aria-label="Open user menu"
    />
    <div v-if="!props.compact" class="ml-3 flex-1 min-w-0">
      <div class="font-bold text-gray-900 dark:text-gray-100 leading-tight text-base">{{ user.name }}</div>
      <div class="text-xs text-gray-600 dark:text-gray-400 truncate break-all max-w-[180px]">{{ user.email }}</div>
    </div>
    <div
      v-if="showDropdown"
      :class="[
        'absolute mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg z-50 rounded-lg',
        props.placement === 'bottom' ? 'right-0 top-full' : 'right-0 bottom-full'
      ]"
    >
      <RouterLink to="/settings" @click="closeDropdown" class="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Settings</RouterLink>
      <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.relative { display: flex; align-items: center; }
</style> 
<script setup>
import { ref } from 'vue';
import { useAuthStore } from './stores/auth';
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';
import LoginForm from './components/LoginForm.vue';
import SignupForm from './components/SignupForm.vue';
import { useUserStore } from './stores/user';
import { useTaskStore } from './stores/task';

const authMode = ref('login'); // 'login' or 'signup'
const authStore = useAuthStore();
const userStore = useUserStore();
const taskStore = useTaskStore();
const { loading, error } = authStore.getAsyncState();

function switchMode(mode) {
  authMode.value = mode;
  error.value = '';
}

async function handleLogin({ email, password }) {
  await authStore.login(email, password);
  // Fetch user data after login
  await userStore.fetchProfile();
  await taskStore.fetchTasks();
}

async function handleSignup({ name, email, password, password_confirmation }) {
  await authStore.signup(name, email, password, password_confirmation);
  // Fetch user data after signup
  await userStore.fetchProfile();
  await taskStore.fetchTasks();
}

async function handleLogout() {
  await authStore.logout();
  // Reset user and task stores on logout
  userStore.$reset();
  taskStore.$reset();
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
    <template v-if="!authStore.isAuthenticated">
      <div class="flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div class="flex justify-center items-center gap-2 py-8">
            <div class="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-extrabold text-2xl">T</span>
            </div>
            <span class="text-blue-700 font-extrabold text-2xl tracking-tight">Tasks</span>
          </div>
          <div class="flex justify-center mb-6">
            <button :class="['px-4 py-2 rounded-l-lg font-bold', authMode === 'login' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700']" @click="switchMode('login')">Login</button>
            <button :class="['px-4 py-2 rounded-r-lg font-bold', authMode === 'signup' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700']" @click="switchMode('signup')">Sign Up</button>
          </div>
          <div v-if="error" class="mb-4 text-red-600 text-sm text-center">{{ error }}</div>
          <LoginForm v-if="authMode === 'login'" @login="handleLogin" :loading="loading" @switch="switchMode" />
          <SignupForm v-else @signup="handleSignup" :loading="loading" @switch="switchMode" />
        </div>
      </div>
    </template>
    <template v-else>
      <Sidebar />
      <div class="ml-64">
        <Topbar @logout="handleLogout" />
        <RouterView />
      </div>
    </template>
  </div>
</template>

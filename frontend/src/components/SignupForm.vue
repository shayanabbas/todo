<template>
  <form class="w-full" @submit.prevent="$emit('signup', { name, email, password, password_confirmation })">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Create your account</h2>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input v-model="name" id="name" type="text" required autocomplete="name" placeholder="Your Name"
        class="block w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input v-model="email" id="email" type="email" required autocomplete="email" placeholder="you@email.com"
        class="block w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input v-model="password" id="password" type="password" required autocomplete="new-password" placeholder="••••••••"
        class="block w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
    </div>
    <div class="mb-6">
      <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
      <input v-model="password_confirmation" id="password_confirmation" type="password" required autocomplete="new-password" placeholder="••••••••"
        class="block w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
    </div>
    <button type="submit"
      class="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:bg-blue-300 disabled:text-white disabled:opacity-80 disabled:cursor-not-allowed">
      Sign Up
    </button>
    <div class="text-gray-700 text-center text-sm mt-4">
      Already have an account?
      <a href="#" class="text-blue-700 hover:underline font-medium" @click.prevent="$emit('switch', 'login')">Sign in</a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
</script> 
<template>
  <div class="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:text-gray-100">
    <h2 class="text-2xl font-bold mb-6">Profile Settings</h2>
    <form class="space-y-6">
      <div class="flex items-center gap-6">
        <img :src="previewUrl || user.profileImageUrl" class="w-20 h-20 rounded-full border-2 border-blue-100 shadow object-cover aspect-square" alt="Profile" />
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Profile Image</label>
          <input type="file" accept="image/*" @change="handleFileChange" class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
        <input v-model="name" type="text" class="mt-1 block w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input v-model="email" type="email" class="mt-1 block w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" required />
      </div>
      <button type="submit" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const user = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  profileImageUrl: 'https://i.pravatar.cc/100?img=1',
};
const name = ref(user.name);
const email = ref(user.email);
const profile_image = ref(null);
const previewUrl = ref(user.profileImageUrl);
function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    profile_image.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}
</script> 
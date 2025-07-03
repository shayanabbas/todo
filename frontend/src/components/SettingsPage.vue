<template>
  <div class="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:text-gray-100">
    <h2 class="text-2xl font-bold mb-6">Profile Settings</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
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
      <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</div>
      <div v-if="success" class="text-green-600 dark:text-green-400 text-sm mb-2">Profile updated successfully!</div>
      <button type="submit" :disabled="loading" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition">
        <span v-if="loading">Saving...</span>
        <span v-else>Save Changes</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useUserStore } from '../stores/user';

const user = useUserStore();
const { loading, error } = user.getAsyncState();

const name = ref(user.name);
const email = ref(user.email);
const profile_image = ref(null);
const previewUrl = ref(user.profile_image ? user.profileImageUrl : '');
const success = ref(false);

onMounted(() => {
  if (!user.name) user.fetchProfile();
});

watchEffect(() => {
  name.value = user.name;
  email.value = user.email;
});

function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    profile_image.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function handleSubmit() {
  await user.updateProfile({
    name: name.value,
    email: email.value,
    profile_image: profile_image.value,
  });
  if (!error.value && !loading.value) {
    profile_image.value = null;
    previewUrl.value = '';
    success.value = true;
    setTimeout(() => { success.value = false; }, 2500);
  }
}
</script> 
<template>
    <div v-if="visible" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md relative dark:text-gray-100">
        <button @click="visible = false" class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <Icon icon="material-symbols:close" class="w-6 h-6" />
        </button>
        <h2 class="text-xl font-bold mb-4">Add New Task</h2>
        <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">Title</label>
            <input v-model="title" type="text" required class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">Labels</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(tag, idx) in labels" :key="tag + idx" class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-bold">
                {{ tag }}
                <button type="button" @click="removeLabel(idx)" class="ml-1 text-blue-400 hover:text-blue-700 dark:hover:text-blue-100 focus:outline-none" aria-label="Remove label">
                  &times;
                </button>
              </span>
            </div>
            <input
              v-model="labelInput"
              @keydown="onLabelInputKeydown"
              @blur="addLabelFromInput"
              type="text"
              class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
              placeholder="Type label and press Enter or comma"
              autocomplete="off"
              aria-label="Add label"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">Description</label>
            <textarea v-model="description" class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">Priority</label>
            <select v-model="priority" class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button type="submit" class="bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800">
            Add Task
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue';
  import { ref } from 'vue';
  
  const visible = ref(true);
  const title = ref('Sample Task');
  const labels = ref(['feature', 'urgent']);
  const labelInput = ref('');
  const description = ref('This is a sample task description.');
  const priority = ref('medium');
  
  function addLabelFromInput() {
    const val = labelInput.value.trim();
    if (val && !labels.value.includes(val)) {
      labels.value.push(val);
    }
    labelInput.value = '';
  }
  function removeLabel(idx) {
    labels.value.splice(idx, 1);
  }
  function onSubmit() {
    // Just close modal for template
    visible.value = false;
  }
  function onLabelInputKeydown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addLabelFromInput();
    }
  }
  </script> 
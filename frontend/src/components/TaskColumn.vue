<template>
  <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow w-80 min-w-80 flex flex-col border border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between px-5 py-4 border-b bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-base text-gray-800 dark:text-gray-100 tracking-tight">{{ title }}</h2>
        <span v-if="tasks.length" class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-bold">{{ tasks.length }}</span>
      </div>
      <button class="ml-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300" @click="$emit('add', title)">
        <Icon icon="material-symbols:add" class="w-5 h-5" />
      </button>
    </div>
    <div class="flex-1 px-4 py-4 space-y-4 min-h-[500px]">
      <TaskList
        :tasks="tasks"
        vertical
        @edit="handleEdit"
        @complete="handleComplete"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { defineProps, defineEmits } from 'vue';
import TaskList from './TaskList.vue';

const props = defineProps({
  title: String,
  tasks: Array,
});
const emit = defineEmits(['edit', 'add', 'complete', 'delete']);

function handleEdit(task) {
  emit('edit', task);
}
function handleAdd() {
  emit('add', props.title);
}
function handleComplete(task) {
  emit('complete', task);
}
function handleDelete(task) {
  emit('delete', task);
}
</script>

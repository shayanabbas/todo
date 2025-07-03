<template>
  <div>
    <div
      v-for="task in tasks"
      :key="task.id"
      class="relative mb-4"
    >
      <div class="flex items-start">
        <div v-if="level > 0" class="w-6 flex flex-col items-center">
          <span class="h-6 border-l-2 border-gray-300 dark:border-gray-700"></span>
        </div>
        <div class="flex-1">
          <TaskCard :task="task" @edit="$emit('edit', task)" />
          <button
            class="ml-6 mt-2 text-xs text-blue-600 hover:underline"
            @click="$emit('add-subtask', task)"
          >
            <Icon icon="material-symbols:add" class="inline w-4 h-4" /> Add Subtask
          </button>
        </div>
      </div>
      <div
        v-if="getChildren(task).length"
        class="ml-8 mt-2"
      >
        <TaskTree
          :tasks="getChildren(task)"
          :level="level + 1"
          @edit="$emit('edit', $event)"
          @add-subtask="$emit('add-subtask', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  tasks: Array,
  level: {
    type: Number,
    default: 0,
  },
});
defineEmits(['edit', 'add-subtask']);

function getChildren(task) {
  return Array.isArray(task.children_recursive) ? task.children_recursive : [];
}
</script> 
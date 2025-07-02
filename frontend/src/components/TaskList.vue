<script setup>
import TaskCard from './TaskCard.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
  vertical: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['edit', 'complete', 'delete']);

function handleEdit(task) {
  emit('edit', task);
}
function handleComplete(task) {
  emit('complete', task);
}
function handleDelete(task) {
  emit('delete', task);
}
</script>

<template>
  <div>
    <div v-if="!tasks.length" class="py-8 text-center text-gray-400 dark:text-gray-500">
      <slot>No tasks to show.</slot>
    </div>
    <div
      v-else
      :class="vertical
        ? 'flex flex-col gap-y-4'
        : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'"
    >
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="handleEdit"
        @complete="handleComplete"
        @delete="handleDelete"
      />
    </div>
  </div>
</template> 
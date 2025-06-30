<template>
  <div class="flex-1 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-[calc(100vh-4rem)] p-8">

    <!-- Kanban Board -->
    <div v-if="loading" class="text-gray-500 dark:text-gray-300 text-center py-10">Loading tasks...</div>
    <div v-else-if="error" class="text-red-500 dark:text-red-400 text-center py-10">{{ error }}</div>
    <div v-else class="flex flex-wrap gap-8 justify-start">
      <TaskColumn
        v-for="label in columnOrder"
        :key="label"
        :title="label"
        :tasks="groupedTasks[label]"
        @complete="taskStore.toggleComplete"
      />
    </div>
  </div>
</template>

<script setup>
import TaskColumn from './TaskColumn.vue';
import { Icon } from '@iconify/vue';
import { onMounted, ref, computed } from 'vue';
import { useTaskStore } from '../stores/task';
import TaskModal from './TaskModal.vue';
import TaskList from './TaskList.vue';
import { useTaskModal } from '../composables/useTaskModal';
import { useGroupedTasks } from '../composables/useGroupedTasks';

const taskStore = useTaskStore();
const { loading, error } = taskStore.getAsyncState();
const tasks = computed(() => taskStore.tasks);

const { groupedTasks, columnOrder } = useGroupedTasks(tasks);

onMounted(() => {
  if (!tasks.value.length && !loading.value) taskStore.fetchTasks();
});
</script>

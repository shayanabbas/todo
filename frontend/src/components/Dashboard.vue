<template>
  <div class="flex-1 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-[calc(100vh-4rem)] p-8">
    
    <!-- Add Task Modal -->
    <TaskModal
      :visible="showAddModal"
      :loading="addLoading"
      :error="addError"
      :initial="addForm"
      @close="closeAddModal"
      @submit="handleAddTaskSubmit"
    />

    <!-- Edit Task Modal -->
    <TaskModal
      v-if="editTask"
      :key="editModalKey"
      :visible="!!editTask"
      :loading="editLoading"
      :error="editError"
      :initial="editTask"
      @close="closeEditModal"
      @submit="handleEditTaskSubmit"
    />

    <!-- Kanban Board -->
    <div v-if="loading && !tasks.length" class="text-gray-500 dark:text-gray-300 text-center py-10">Loading tasks...</div>
    <div v-else-if="error" class="text-red-500 dark:text-red-400 text-center py-10">{{ error }}</div>
    <div v-else class="flex flex-wrap gap-8 justify-start">
      <TaskColumn
        v-for="label in columnOrder"
        :key="label"
        :title="label"
        :tasks="groupedTasks[label]"
        @edit="(task) => { openEditModal(task); }"
        @add="label => openAddModal({ title: '', labels: [label], description: '', priority: 'medium' })"
        @complete="taskStore.toggleComplete"
        @delete="taskStore.deleteTask"
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

const {
  showAddModal,
  addLoading,
  addError,
  addForm,
  openAddModal,
  closeAddModal,
  handleAddTaskSubmit,
  editTask,
  editLoading,
  editError,
  openEditModal,
  closeEditModal,
  handleEditTaskSubmit,
  editModalKey,
} = useTaskModal(taskStore);

const { groupedTasks, columnOrder } = useGroupedTasks(tasks);

onMounted(() => {
  if (!tasks.value.length && !loading.value) taskStore.fetchTasks();
});
</script>

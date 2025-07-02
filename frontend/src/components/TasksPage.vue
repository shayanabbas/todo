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
      :key="editTask?.id"
      :visible="!!editTask"
      :loading="editLoading"
      :error="editError"
      :initial="editTask"
      @close="closeEditModal"
      @submit="handleEditTaskSubmit"
    />
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold">Upcoming tasks</h2>
    </div>
    <TaskList
      :tasks="upcomingTasks"
      @edit="openEditModal"
      @complete="taskStore.toggleComplete"
      @delete="taskStore.deleteTask"
    />
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-4">Completed tasks</h2>
      <TaskList
        :tasks="completedTasks"
        @edit="openEditModal"
        @complete="taskStore.toggleComplete"
        @delete="taskStore.deleteTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/task';
import TaskCard from './TaskCard.vue';
import TaskModal from './TaskModal.vue';
import { Icon } from '@iconify/vue';
import TaskList from './TaskList.vue';
import { useTaskModal } from '../composables/useTaskModal';

const taskStore = useTaskStore();
const { loading, error } = taskStore.getAsyncState();
const tasks = taskStore.tasks;

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
} = useTaskModal(taskStore);

onMounted(() => {
  if (!tasks.length && !loading.value) taskStore.fetchTasks();
});

// Computed lists for upcoming and completed tasks
const upcomingTasks = computed(() => tasks.filter(t => !t.completed));
const completedTasks = computed(() => tasks.filter(t => t.completed));
</script>

<style scoped>
/* Responsive grid for tasks */
.grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style> 
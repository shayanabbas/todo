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
      <h2 class="text-2xl font-bold">All Tasks</h2>
    </div>
    <div v-if="loading && !taskTree.length" class="text-gray-500 dark:text-gray-300 text-center py-10">Loading tasks...</div>
    <div v-else-if="error" class="text-red-500 dark:text-red-400 text-center py-10">{{ error }}</div>
    <div v-else>
      <TaskTree :tasks="taskTree" @edit="openEditModal" @add-subtask="handleAddSubtask" />
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
import TaskTree from './TaskTree.vue';

const taskStore = useTaskStore();
const { loading, error } = taskStore.getAsyncState();
const tasks = taskStore.tasks;
const taskTree = computed(() => taskStore.taskTree);

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
  taskStore.fetchTaskTree();
});

function handleAddSubtask(parentTask) {
  openAddModal({ title: '', labels: [], description: '', priority: 'medium', parent_id: parentTask.id });
}
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
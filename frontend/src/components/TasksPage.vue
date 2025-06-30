<template>
  <div class="flex-1 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-[calc(100vh-4rem)] p-8">
    <!-- Add Task Modal -->
    <TaskModal :visible="showAddModal" @close="closeAddModal" />
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold">Upcoming tasks</h2>
      <button @click="openAddModal" class="bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:bg-blue-800">Add Task</button>
    </div>
    <TaskList :tasks="upcomingTasks" />
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-4">Completed tasks</h2>
      <TaskList :tasks="completedTasks" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TaskModal from './TaskModal.vue';
import TaskList from './TaskList.vue';

const showAddModal = ref(false);
function openAddModal() { showAddModal.value = true; }
function closeAddModal() { showAddModal.value = false; }

// Sample tasks
const tasks = [
  { id: 1, title: 'Sample Task 1', labels: ['feature'], description: 'Description 1', priority: 'high', completed: false },
  { id: 2, title: 'Sample Task 2', labels: ['bug'], description: 'Description 2', priority: 'medium', completed: false },
  { id: 3, title: 'Sample Task 3', labels: ['urgent'], description: 'Description 3', priority: 'low', completed: true },
];
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
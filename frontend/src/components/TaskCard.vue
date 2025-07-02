<template>
  <div :class="[
    'bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col gap-3 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition relative group',
    task.completed ? 'bg-gray-200 dark:bg-gray-700 opacity-70' : ''
  ]">
    <div class="absolute top-3 right-3 flex gap-1">
      <div class="relative">
        <button @click="toggleMenu" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-200">
          <Icon icon="material-symbols:more-horiz" class="w-6 h-6" />
        </button>
        <div v-if="showMenu" class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <button @click="handleEdit" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100">Edit</button>
          <button @click="confirmDelete" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Delete</button>
        </div>
      </div>
    </div>
    <div class="flex gap-2 mb-1 flex-wrap">
      <span v-for="(label, idx) in allLabels" :key="label + idx" class="px-2 py-0.5 rounded-full text-xs font-bold" :class="labelClass(label)">{{ label }}</span>
    </div>
    <div class="flex items-center gap-2">
      <input type="checkbox" v-model="localCompleted" @change="toggleCompleted" class="accent-blue-600 w-5 h-5" />
      <span :class="['font-semibold text-lg', task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100']">{{ task.title }}</span>
    </div>
    <div v-if="task.description" class="text-gray-500 dark:text-gray-300 text-sm">{{ task.description }}</div>
    <div v-if="task.priority" class="text-xs font-semibold mt-1" :class="priorityClass(task.priority)">
      {{ task.priority.charAt(0).toUpperCase() + task.priority.slice(1) }} Priority
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref, watch, defineEmits, onMounted, onBeforeUnmount, computed } from 'vue';
import { useTaskStore } from '../stores/task';
import { normalizeLabels } from '../utils';

const emit = defineEmits(['edit']);

const props = defineProps({
  task: Object,
});
const taskStore = useTaskStore();

const localCompleted = ref(props.task.completed);
watch(() => props.task.completed, (val) => {
  localCompleted.value = val;
});

function toggleCompleted() {
  taskStore.updateTask(props.task.id, { completed: localCompleted.value });
}

function labelClass(label) {
  // color mapping for known labels
  if (label.toLowerCase().includes('bug')) return 'bg-red-100 text-red-700';
  if (label.toLowerCase().includes('feature')) return 'bg-green-100 text-green-700';
  if (label.toLowerCase().includes('feedback')) return 'bg-yellow-100 text-yellow-700';
  if (label.toLowerCase().includes('refactor')) return 'bg-blue-100 text-blue-700';
  return 'bg-gray-100 text-gray-700';
}

function priorityClass(priority) {
  if (priority === 'high') return 'text-red-600';
  if (priority === 'medium') return 'text-yellow-600';
  if (priority === 'low') return 'text-green-600';
  return '';
}

function confirmDelete() {
  closeMenu();
  if (window.confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(props.task.id);
  }
}

const allLabels = computed(() => normalizeLabels(props.task.labels));

function emitEdit() {
  emit('edit', {
    id: props.task.id,
    title: props.task.title,
    labels: allLabels.value,
    description: props.task.description || '',
    priority: props.task.priority || 'medium',
  });
}

// Dropdown menu logic
const showMenu = ref(false);
function toggleMenu() {
  showMenu.value = !showMenu.value;
}
function closeMenu() {
  showMenu.value = false;
}
function handleEdit() {
  closeMenu();
  emitEdit();
}
// Close menu on outside click
function handleClickOutside(event) {
  if (!event.target.closest('.absolute.top-3.right-3')) {
    closeMenu();
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

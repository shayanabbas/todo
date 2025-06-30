import { computed } from 'vue';
import { normalizeLabels } from '../utils';

export function useGroupedTasks(tasks) {
  const groupedTasks = computed(() => {
    const groups = {};
    for (const task of tasks.value) {
      const taskLabels = normalizeLabels(task.labels);
      for (const label of taskLabels) {
        if (!groups[label]) groups[label] = [];
        groups[label].push(task);
      }
    }
    return groups;
  });

  const columnOrder = computed(() => Object.keys(groupedTasks.value));

  return { groupedTasks, columnOrder };
} 
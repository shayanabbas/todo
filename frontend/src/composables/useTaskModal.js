import { ref } from 'vue';
import { normalizeLabels } from '../utils';
import { useAsyncState } from './useAsyncState';

export function useTaskModal(taskStore) {
  const showAddModal = ref(false);
  const addForm = ref({ title: '', labels: [], description: '', priority: 'medium' });
  const editTask = ref(null);
  const editModalKey = ref(0);

  // Use useAsyncState for add and edit
  const {
    loading: addLoading,
    error: addError,
    run: runAdd,
  } = useAsyncState();
  const {
    loading: editLoading,
    error: editError,
    run: runEdit,
  } = useAsyncState();

  function openAddModal(initial = null) {
    addForm.value = initial || { title: '', labels: [], description: '', priority: 'medium' };
    addError.value = '';
    showAddModal.value = true;
  }
  function closeAddModal() {
    showAddModal.value = false;
  }
  async function handleAddTaskSubmit(form) {
    await runAdd(async () => {
      await taskStore.createTask({
        title: form.title,
        labels: form.labels,
        description: form.description,
        priority: form.priority,
        completed: false,
        ...(form.parent_id ? { parent_id: form.parent_id } : {}),
      });
      await taskStore.fetchTaskTree();
      closeAddModal();
    });
  }

  function openEditModal(task) {
    editTask.value = null;
    setTimeout(() => {
      editTask.value = {
        id: task.id,
        title: task.title || '',
        labels: normalizeLabels(task.labels, []),
        description: task.description || '',
        priority: task.priority || 'medium',
      };
      editError.value = '';
      editModalKey.value = Date.now();
    }, 0);
  }
  function closeEditModal() {
    editTask.value = null;
  }
  async function handleEditTaskSubmit(form) {
    await runEdit(async () => {
      await taskStore.updateTask(form.id, {
        title: form.title,
        labels: form.labels,
        description: form.description,
        priority: form.priority,
        completed: form.completed,
      });
      closeEditModal();
    });
  }

  return {
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
  };
} 
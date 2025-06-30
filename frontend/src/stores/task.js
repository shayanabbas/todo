import { defineStore } from 'pinia';
import api from '../api';
import { useAsyncState } from '../composables/useAsyncState';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    // Attach async state to the store instance
    initAsyncState() {
      if (!this._asyncState) {
        this._asyncState = useAsyncState();
      }
      return this._asyncState;
    },
    // Use this in components to get loading/error refs
    getAsyncState() {
      const asyncState = this.initAsyncState();
      return {
        loading: asyncState.loading,
        error: asyncState.error,
      };
    },
    async fetchTasks() {
      const { run } = this.initAsyncState();
      await run(async () => {
        this.tasks = await api.fetchTasks();
      });
    },
    async createTask(task) {
      const { run } = this.initAsyncState();
      await run(async () => {
        const newTask = await api.createTask(task);
        this.tasks.push(newTask);
      });
    },
    async updateTask(id, updates) {
      const { run } = this.initAsyncState();
      await run(async () => {
        const updated = await api.updateTask(id, updates);
        const idx = this.tasks.findIndex(t => t.id === id);
        if (idx !== -1) this.tasks[idx] = updated;
      });
    },
    async deleteTask(id) {
      const { run } = this.initAsyncState();
      await run(async () => {
        await api.deleteTask(id);
        this.tasks = this.tasks.filter(t => t.id !== id);
      });
    },
  },
}); 
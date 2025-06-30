import { defineStore } from 'pinia';
import api from '../api';
import { useAsyncState } from '../composables/useAsyncState';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('token'),
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
    async login(email, password) {
      const { run } = this.initAsyncState();
      await run(async () => {
        await api.login(email, password);
        this.isAuthenticated = true;
      });
    },
    async signup(name, email, password, password_confirmation) {
      const { run } = this.initAsyncState();
      await run(async () => {
        await api.signup(name, email, password, password_confirmation);
        this.isAuthenticated = true;
      });
    },
    async logout() {
      const { run } = this.initAsyncState();
      await run(async () => {
        await api.logout();
        localStorage.removeItem('token');
        this.isAuthenticated = false;
      });
    },
    initAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
  },
}); 
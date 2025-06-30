import { defineStore } from 'pinia';
import api from '../api';
import { useAsyncState } from '../composables/useAsyncState';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    name: '',
    email: '',
    profile_image: '',
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
    async fetchProfile() {
      const { run } = this.initAsyncState();
      await run(async () => {
        const data = await api.getProfile();
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.profile_image = data.profile_image;
      });
    },
    async updateProfile(profile) {
      const { run } = this.initAsyncState();
      await run(async () => {
        const data = await api.updateProfile(profile);
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.profile_image = data.profile_image;
      });
    },
  },
  getters: {
    profileImageUrl: (state) =>
      state.profile_image
        ? `${import.meta.env.VITE_PUBLIC_BASE_URL}/storage/${state.profile_image}`
        : 'https://randomuser.me/api/portraits/lego/1.jpg',
  },
}); 
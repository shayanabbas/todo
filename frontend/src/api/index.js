import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Adjust if your backend runs elsewhere
  withCredentials: true, // Needed for Sanctum
});

// Add a request interceptor to include the token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Auth
  async login(email, password) {
    const { data } = await api.post('/login', { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },
  async signup(name, email, password, password_confirmation) {
    const { data } = await api.post('/register', { name, email, password, password_confirmation });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },
  async logout() {
    await api.post('/logout');
    localStorage.removeItem('token');
  },

  // Tasks
  async fetchTasks() {
    const { data } = await api.get('/tasks');
    return data;
  },
  async createTask(task) {
    const { data } = await api.post('/tasks', task);
    return data;
  },
  async updateTask(id, updates) {
    const { data } = await api.put(`/tasks/${id}`, updates);
    return data;
  },
  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
  },
  async fetchTaskTree() {
    const { data } = await api.get('/tasks-tree');
    return data;
  },

  // Profile
  async getProfile() {
    const { data } = await api.get('/profile');
    return data;
  },
  async updateProfile(profile) {
    // profile: { name, email, profile_image (optional File) }
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    if (profile.profile_image) {
      formData.append('profile_image', profile.profile_image);
    }
    const { data } = await api.post('/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
}; 
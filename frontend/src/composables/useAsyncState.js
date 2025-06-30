import { ref } from 'vue';

export function useAsyncState() {
  const loading = ref(false);
  const error = ref('');

  async function run(fn, ...args) {
    loading.value = true;
    error.value = '';
    try {
      const result = await fn(...args);
      return result;
    } catch (e) {
      error.value = e?.message || e?.response?.data?.message || 'An error occurred.';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, run };
} 
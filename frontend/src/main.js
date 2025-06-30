import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialize theme BEFORE mounting
if (typeof window !== 'undefined') {
  const themeStore = useThemeStore()
  themeStore.initTheme()
}

app.mount('#app')

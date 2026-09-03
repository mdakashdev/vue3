import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import './style.css'
import router from './router'

const queryClient = new QueryClient()

const app = createApp(App);

app.use(router)
app.use(createPinia())
app.use(VueQueryPlugin, {
  queryClient,
})
app.mount('#app')

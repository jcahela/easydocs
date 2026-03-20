import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/main.css'
import App from './App.vue'
import DocumentList from './views/DocumentList/DocumentList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'DocumentList',
      component: DocumentList,
    },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')

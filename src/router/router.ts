import { createWebHistory, createRouter } from 'vue-router'
import ChatView from '../components/ChatView.vue'
import ChatStub from '../components/ChatStub.vue'

const routes = [
  { path: '/', component: ChatStub },
  { path: '/:id', component: ChatView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

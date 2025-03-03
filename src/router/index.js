import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoView from '../views/TodoView.vue'
import SettingView from '../views/SettingView.vue'

const routes = [
  {
    path: '/My-Practice/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/My-Practice/todos',
    name: 'todos',
    component: TodoView
  },
  {
    path: '/My-Practice/settings',
    name: 'settings',
    component: SettingView
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.redirectPath) {
    const path = sessionStorage.redirectPath
    sessionStorage.removeItem('redirectPath')
    next(path)
  } else {
    next()
  }
})

export default router

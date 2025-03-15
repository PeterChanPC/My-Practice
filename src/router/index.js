import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'
import TodoView from '@/views/Todos/TodoView.vue'
import CalendarView from '@/views/Calendar/CalendarView.vue'
import AuthView from '@/views/Auth/AuthView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import AuthContentView from '@/views/Auth/AuthContentView.vue'
import SettingView from '@/views/SettingView.vue'
import { useUserStore } from '@/stores/user.store'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoView,
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/auth-content',
    name: 'auth-content',
    component: AuthContentView,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView,
  },
]

const router = createRouter({
  history: createWebHistory('/My-Practice/'),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // authentication await is put in if statements
  // for faster load time for no require auth routes
  if (sessionStorage.redirect) {
    // handle github pages 404 redirect
    const path = sessionStorage.redirect
    sessionStorage.removeItem('redirect')
    next(path)
  } else if (to.meta.requiresAuth) {
    // direct to login page if user is not authenticated
    next(await userStore.handleAuth() || {
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (to.meta.requiresGuest && await userStore.handleAuth()) {
    // direct login user back to Auth View
    // becuz users can only access Login View from there
    next({ name: 'auth' })
  } else {
    next()
  }
})

export default router

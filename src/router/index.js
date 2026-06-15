import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue' // Admin paneli
import Teacher from '../views/Teacher.vue'     // O'qituvchi paneli
import Student from '../views/Student.vue'     // O'quvchi paneli

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher
  },
  {
    path: '/student',
    name: 'Student',
    component: Student
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
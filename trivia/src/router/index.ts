import { createRouter, createWebHistory } from 'vue-router'
import QuizStartView from '../views/QuizStartView.vue'
import QuizView from '../views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: QuizStartView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView
    }
  ]
})

export default router

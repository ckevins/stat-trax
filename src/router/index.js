import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Scorecard from '../views/Scorecard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/scorecard',
    component: Scorecard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

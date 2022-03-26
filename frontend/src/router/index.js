import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Leagues from '../views/Leagues.vue'
// import Teams from '../views/Teams.vue'
import Players from '../views/Players.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/leagues',
  //   name: 'Leagues',
  //   component: Leagues
  // },
  // {
  //   path: '/teams',
  //   name: 'Teams',
  //   component: Teams
  // },
  {
    path: '/players',
    name: 'Players',
    component: Players
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

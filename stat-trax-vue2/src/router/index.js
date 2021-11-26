import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateLeague from '../views/CreateLeague.vue'
import MyLeague from '../views/MyLeague.vue'
import LeagueHome from '../views/MyLeague/LeagueHome.vue'
import Standings from '../views/MyLeague/Standings.vue'
import Stats from '../views/MyLeague/Stats.vue'
import Schedule from '../views/MyLeague/Schedule.vue'
import Scorecard from '../views/MyLeague/Scorecard.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-league',
    component: CreateLeague
  },
  {
    path: '/my-league/league-home',
    component: MyLeague,
    children: [
      {
        path: '/my-league/league-home',
        component: LeagueHome
      },
      {
        path: '/my-league/scorecard',
        component: Scorecard
      },
      {
        path: '/my-league/standings',
        component: Standings,
      },
      {
        path: '/my-league/stats',
        component: Stats,
      },
      {
        path: '/my-league/schedule',
        component: Schedule
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

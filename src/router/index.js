import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Scorecard from '../views/Scorecard.vue'
import CreateLeague from '../views/CreateLeague.vue'
import MyLeague from '../views/MyLeague.vue'
import LeagueHome from '../views/LeagueHome.vue'
import Standings from '../views/Standings.vue'
import IndividualStats from '../views/IndividualStats.vue'
import TeamStats from '../views/TeamStats.vue'
import Schedule from '../views/Schedule.vue'

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
        component: Standings  
      },
      {
        path: '/my-league/individual-stats',
        component: IndividualStats
      },
      {
        path: '/my-league/team-stats',
        component: TeamStats
      },
      {
        path: '/my-league/schedule',
        component: Schedule
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

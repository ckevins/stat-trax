import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Scorecard from '../views/Scorecard.vue'
import AddLeague from '../views/AddLeague.vue'
import MyLeague from '../views/MyLeague.vue'
import Standings from '../views/Standings.vue'
import IndividualStats from '../views/IndividualStats.vue'
import TeamStats from '../views/TeamStats.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-league',
    component: AddLeague
  },
  {
    path: '/my-league',
    component: MyLeague,
    children: [ 
      {
        path: '/scorecard',
        component: Scorecard
      },
      {
        path: '/standings',
        component: Standings  
      },
      {
        path: '/individual-stats',
        component: IndividualStats
      },
      {
        path: '/team-stats',
        component: TeamStats
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

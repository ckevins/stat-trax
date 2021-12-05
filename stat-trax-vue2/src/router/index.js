import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import New from '../views/New.vue'
  import NewLeague from '../views/New/NewLeague.vue'
  import NewPlayer from '../views/New/NewPlayer.vue'
import MyLeague from '../views/MyLeague.vue'
  import LeagueHome from '../views/MyLeague/LeagueHome.vue'
  import Scorecard from '../views/MyLeague/Scorecard.vue'
import MyPlayer from '../views/MyPlayer.vue'
  import PlayerHome from '../views/MyPlayer/PlayerHome'
  import PlayerScorecard from '../views/MyPlayer/PlayerScorecard'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new/league',
    component: New,
    children: [
      {
        path: '/new/league',
        component: NewLeague
      },
      {
        path: '/new/player',
        component: NewPlayer
      }
    ]
  },
  {
    path: '/my-league/home',
    component: MyLeague,
    children: [
      {
        path: '/my-league/home',
        component: LeagueHome
      },
      {
        path: '/my-league/scorecard',
        component: Scorecard
      },
    ]
  },
  {
    path: '/my-player',
    component: MyPlayer,
    children: [
      {
        path: '/my-player/home',
        component: PlayerHome
      },
      {
        path: '/my-player/scorecard',
        component: PlayerScorecard
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

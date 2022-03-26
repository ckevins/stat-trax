import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
// import Leagues from './views/Leagues.vue'
// import Teams from './views/Teams.vue'
import Players from './views/Players.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
})

createApp(App)
.use(router)
.mount('#app')

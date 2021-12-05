import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ApolloClient from 'apollo-boost'

// const apolloClient = new ApolloClient({
//   // You should use an absolute URL here
//   uri: 'https://api.graphcms.com/simple/v1/awesomeTalksClone'
// })


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

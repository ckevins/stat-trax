import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:3000'
})


Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})


new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { createProvider } from './vue-apollo'
// import { apolloClient } from '../src/vue-apollo'
// import VueCompositionApi from '@vue/composition-api'
import { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './graphql/client'

Vue.config.productionTip = false

new Vue({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

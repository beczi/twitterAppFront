import axios from 'axios'
import uuidv1 from 'uuid/v1'
import oauthSignature from 'oauth-signature'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAxios from 'vue-axios'
import SocialSharing from 'vue-social-sharing'
import App from './App'
import routes from './routes/Routes'

Vue.config.productionTip = false
Vue.use(SocialSharing);
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter ({
    routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VModal from 'vue-js-modal'
import VueSession from 'vue-session'
import { Navbar } from 'bootstrap-vue/es/components'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ToggleButton from 'vue-js-toggle-button'
import routes from './router'

Vue.prototype.$http = axios.create({
  baseURL: 'https://dimiwords.tk:5000/' // api server url
})

Vue.config.productionTip = false

Vue.use(VModal, { dynamic: true })
Vue.use(VueSession)
Vue.use(Navbar)
Vue.use(ToggleButton)

new Vue({
  el: '#app',
  router: routes,
  render: h => h(App),
}).$mount('#app')

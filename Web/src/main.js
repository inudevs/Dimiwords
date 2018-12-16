// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VModal from 'vue-js-modal'

Vue.prototype.$http = axios.create({
  baseURL: "http://dimiwords.tk:3000/" // api server url
});

Vue.config.productionTip = false

Vue.use(VModal, { dynamic: true })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './App'
import router from './router'
import injector from 'vue-inject'
import './assets/css/style.css'

Vue.config.productionTip = false

require('@/services/injector-register')
Vue.use(injector)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

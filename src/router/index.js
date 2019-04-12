import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Navigation from '@/components/Navigation.vue'

const routes = [
  {
    path: '/',
    components: {
      dashboard: Dashboard,
      nav: Navigation
    }
  }
]

Vue.use(Router)

export default new Router({
  routes,
  mode: 'history'
})

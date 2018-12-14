import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Show from '@/components/Show'
import '../assets/css/style.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/:id',
      name: 'show',
      component: Show
    }
  ]
})

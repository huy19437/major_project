import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/Components/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/homepage',
      name: 'HomePage',
      component: HomePage
    }
  ]
})

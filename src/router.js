import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import app from './App'
import home from './views/Home/Home'

const mainRouter = new VueRouter({
  routes: [
    {
      path: '/app',
      component: app,
    },{
      path: '/home',
      component: home,
    }
  ]
})

export default mainRouter

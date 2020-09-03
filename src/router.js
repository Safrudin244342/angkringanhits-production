import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import app from './App'
import home from './views/Home/Home'

const mainRouter = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'app',
      component: app,
    },{
      path: '/home',
      name: 'home',
      component: home,
    }
  ],
  mode: 'history'
})

export default mainRouter

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './views/Home/Home'
import history from './views/History/History'

const mainRouter = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'app',
      component: home,
    },{
      path: '/history',
      name: 'home',
      component: history,
    }
  ],
  mode: 'history'
})

export default mainRouter

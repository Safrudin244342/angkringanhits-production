import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from './views/Home/Home'
import history from './views/History/History'
import setting from './views/Setting/Setting'
import user from './views/User/User'

const mainRouter = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },{
      path: '/history',
      name: 'history',
      component: history,
    },{
      path: '/setting',
      name: 'setting',
      component: setting
    },{
      path: '/user',
      name: 'user',
      component: user
    }
  ],
  mode: 'history'
})

export default mainRouter

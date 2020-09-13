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
      name: 'app',
      component: home,
    },{
      path: '/history',
      name: 'home',
      component: history,
    },{
      path: '/setting',
      name: 'setting',
      component: setting
    },{
      path: '/user',
      name: 'login',
      component: user
    }
  ],
  mode: 'history'
})

export default mainRouter

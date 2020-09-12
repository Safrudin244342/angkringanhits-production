import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './Store/main'
import Rupiah from './helper/Rupiah'

Vue.config.productionTip = false
Vue.mixin({
  methods: {
    Rupiah
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

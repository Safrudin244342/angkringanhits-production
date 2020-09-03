import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addCart(state, payload) {
      state.cart.push(payload)
    }
  },
  getters: {
    getCart: state => state.cart
  }
})

export default store
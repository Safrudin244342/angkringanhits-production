import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addOrder(state, newOrder) {
      state.cart.push(newOrder)
    },
    removeOrder(state, orderId){
      let index = state.cart.findIndex(value => value.id === orderId)
      state.cart.splice(index, 1)
    },
    upEstimasi(state, orderId){
      const index = state.cart.findIndex(value => value.id === orderId)
      state.cart[index].estimasi = state.cart[index].estimasi + 1
      state.cart[index].pay = state.cart[index].estimasi * state.cart[index].price
    },
    downEstimasi(state, orderId){
      const index = state.cart.findIndex(value => value.id === orderId)
      state.cart[index].estimasi = state.cart[index].estimasi - 1
      state.cart[index].pay = state.cart[index].estimasi * state.cart[index].price
    }
  },
  actions: {
    addOrder({ commit }, newOrder){
      commit('addOrder', newOrder)
    },
    removeOrder({ commit }, id){
      commit('removeOrder', id)
    },
    upEstimasi({ commit }, id){
      commit('upEstimasi', id)
    },
    downEstimasi({ commit }, id){
      commit('downEstimasi', id)
    }
  },
  getters: {
    getCart: state => state.cart
  }
})

export default store
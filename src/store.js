import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    cart: [],
    products: [],
    notif: {
      message: '',
      status: '',
      show: false
    }
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
    },
    cleanOrder(state){
      state.cart = []
    },
    changeProducts(state, newProducts){
      state.products = newProducts
    },
    addProduct(state, newProduct){
      state.products.unshift(newProduct)
    },
    showNotif(state, newNotif){
      state.notif = newNotif
    },
    removeNotif(state){
      state.notif = {
        message: '',
        status: '',
        show: false
      }
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
    },
    changeProducts({ commit }, newProducts){
      commit('changeProducts', newProducts)
    },
    cleanOrder({ commit }) {
      commit('cleanOrder')
    },
    addProduct({ commit }, newProduct){
      commit('addProduct', newProduct)
    },
    showNotif({ commit }, newNotif){
      commit('showNotif', newNotif)
    },
    removeNotif({ commit }){
      commit('removeNotif')
    }
  },
  getters: {
    getCart: state => state.cart,
    getProducts: state => state.products,
    getNotif: state => state.notif
  }
})

export default store
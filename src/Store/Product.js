const Product = {
  state: () => ({
    products: []
  }),
  mutations: {
    changeProducts(state, newProducts){
      state.products = newProducts
    },
    addProduct(state, newProduct){
      state.products.unshift(newProduct)
    }
  },
  actions: {
    changeProducts({ commit }, newProducts){
      commit('changeProducts', newProducts)
    },
    addProduct({ commit }, newProduct){
      commit('addProduct', newProduct)
    }
  },
  getters: {
    getProducts: state => state.products
  }
}

export default Product

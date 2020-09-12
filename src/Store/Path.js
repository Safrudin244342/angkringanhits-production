const Path = {
  state: () => ({
    path: '/'
  }),
  mutations: {
    changePath(state, newPath){
      state.path = newPath
    }
  },
  actions: {
    changePath({ commit }, newPath){
      commit('changePath', newPath)
    }
  },
  getters: {
    getPath: state => state.path
  }
}

export default Path
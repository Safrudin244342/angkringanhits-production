const Auth = {
  state: () => ({
    rule: '',
    token: ''
  }),
  mutations: {
    changeToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    changeToken({ commit }, newToken) {
      commit('changeToken', newToken)
    }
  },
  getters: {
    getRule: state => state.rule,
    getToken: state => state.token
  }
}

export default Auth

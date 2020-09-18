import JWTDecode from 'jwt-decode'

const Auth = {
  state: () => ({
    rule: '',
    token: '',
    user: ''
  }),
  mutations: {
    changeToken(state, newToken) {
      const DecToken = JWTDecode(newToken)
      state.rule = DecToken.rule
      state.user = DecToken.user
      state.token = newToken
    },
    logout(state) {
      state.rule = ''
      state.token = ''
      state.user = ''
    }
  },
  actions: {
    changeToken({ commit }, newToken) {
      commit('changeToken', newToken)
    },
    logout({ commit }) {
      commit('logout')
    }
  },
  getters: {
    getRule: state => state.rule,
    getToken: state => state.token,
    getUser: state => state.user
  }
}

export default Auth

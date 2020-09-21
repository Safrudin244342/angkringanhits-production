const Notif = {
  state: () => ({
    notif: {
      message: '',
      status: '',
      show: false
    },
    stateMenu: false,
    progressBar: ''
  }),
  mutations: {
    showNotif(state, newNotif){
      state.notif = newNotif
    },
    removeNotif(state){
      state.notif = {
        message: '',
        status: '',
        show: false
      }
    },
    showMenu(state){
      state.stateMenu = !state.stateMenu
    },
    setupProgressBar(state, progressBar) {
      state.progressBar = progressBar
    }
  },
  actions: {
    showNotif({ commit }, newNotif){
      commit('showNotif', newNotif)
    },
    removeNotif({ commit }){
      commit('removeNotif')
    },
    showMenu({ commit }){
      commit('showMenu')
    },
    setupProgressBar({commit}, progressBar){
      commit('setupProgressBar', progressBar)
    }
  },
  getters: {
    getNotif: state => state.notif,
    getShowMenu: state => state.stateMenu,
    getProgressBar: state => state.progressBar
  }
}

export default Notif

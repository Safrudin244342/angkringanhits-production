const Notif = {
  state: () => ({
    notif: {
      message: '',
      status: '',
      show: false
    },
    stateMenu: false
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
    }
  },
  getters: {
    getNotif: state => state.notif,
    getShowMenu: state => state.stateMenu
  }
}

export default Notif

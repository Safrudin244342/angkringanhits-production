const Setting = {
  state: () => ({
    settingDetail: {},
    listItemSetting: []
  }),
  mutations: {
    changeSettingDetail(state, newDetail){
      state.settingDetail = newDetail
    },
    changeListItemSetting(state, newList){
      state.listItemSetting = newList
    },
    removeItemSetting(state, id){
      const index = state.listItemSetting.findIndex(value => value.id === id)
      state.listItemSetting.splice(index, 1)
    },
    updateItemSetting(state, newItem){
      const index = state.listItemSetting.findIndex(value => value.id === newItem.id)
      state.listItemSetting.splice(index, 1, newItem)
    }
  },
  actions: {
    changeSettingDetail({ commit }, newDetail) {
      commit('changeSettingDetail', newDetail)
    },
    changeListItemSetting({ commit }, newList) {
      commit('changeListItemSetting', newList)
    },
    removeItemSetting({ commit }, id){
      commit('removeItemSetting', id)
    },
    updateItemSetting({ commit }, newItem){
      commit('updateItemSetting', newItem)
    }
  },
  getters: {
    getSettingDetail: state => state.settingDetail,
    getListItemSetting: state => state.listItemSetting
  }
}

export default Setting

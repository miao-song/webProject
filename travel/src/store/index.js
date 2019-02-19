import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: state, 键和值相同 可以省略
  // mutations: mutations 键和值相同 可以省略
  state,
  mutations
})

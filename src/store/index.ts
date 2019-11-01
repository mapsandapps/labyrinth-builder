import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nextSegment: null
  },
  mutations: {
    setNextSegment(state, payload) {
      state.nextSegment = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

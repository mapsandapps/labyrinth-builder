import Vue from 'vue'
import Vuex from 'vuex'
import { StoreState } from './types'

Vue.use(Vuex)


const state: StoreState = {
  currentPosition: null,
  labyrinthSegments: [
    {
      x: 3,
      y: 15,
      z: 0,
      path: 'l 128,0'
    },
    {
      x: 12,
      y: 4,
      z: 0,
      path: 'a 128,128 0 0,1 128,128'
    },
    {
      x: 12,
      y: 5,
      z: 0,
      path: 'a 64,64 0 0,0 64,64'
    },
    {
      x: 12,
      y: 15,
      z: 0,
      path: 'a 64,64 0 0,1 64,64'
    },
    {
      x: 1,
      y: 1,
      z: 0,
      path: 'a 64,64 0 0,1 64,64'
    }
  ],
  segmentsAtSelectedPosition: [],
  tileSize: 64
}

export default new Vuex.Store({
  state,
  getters: {
    currentPosition: state => {
      return state.currentPosition
    },
    getAllSegments: state => {
      return state.labyrinthSegments.map(s => {
        return {
          x: s.x,
          y: s.y,
          z: s.z,
          path: `M ${state.tileSize * (s.x - 1)},${state.tileSize * (s.y - 1)}` + ' ' + s.path
        }
      })
    }
  },
  mutations: {
    createLabyrinthSegment(state, payload) {
      // NOTE: position is actually state.currentPosition, so it could just come from here instead of a param
      state.labyrinthSegments.push({ ...payload.position, path: payload.path })
    },
    removeLastSegment(state) {
      state.labyrinthSegments.pop()
    },
    setCurrentPosition(state, payload) {
      console.log(payload)
      state.currentPosition = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

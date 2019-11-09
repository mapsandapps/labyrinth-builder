import { map } from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import { Stage, StoreState } from './types'

Vue.use(Vuex)

const state: StoreState = {
  builderStage: Stage.Starting,
  currentPosition: null,
  currentSegment: null,
  currentSegmentIndex: null,
  // labyrinthSegments: [
  //   {
  //     x: 3,
  //     y: 15,
  //     z: 0,
  //     path: 'l 128,0'
  //   },
  //   {
  //     x: 12,
  //     y: 4,
  //     z: 0,
  //     path: 'a 128,128 0 0,1 128,128'
  //   },
  //   {
  //     x: 12,
  //     y: 5,
  //     z: 0,
  //     path: 'a 64,64 0 0,0 64,64'
  //   },
  //   {
  //     x: 12,
  //     y: 15,
  //     z: 0,
  //     path: 'a 64,64 0 0,1 64,64'
  //   },
  //   {
  //     x: 1,
  //     y: 1,
  //     z: 0,
  //     path: 'a 64,64 0 0,1 64,64'
  //   }
  // ],
  labyrinthSegments: [
    {
      x: 5,
      y: 7,
      z: 0,
      path: 'a 64,64 0 0,1 64,-64 a 64,64 0 0,1 64,64 a 64,64 0 0,0 64,64 a 64,64 0 0,0 64,-64 a 64,64 0 0,0 -64,-64 a 64,64 0 0,1 -64,-64 a 128,128 0 0,1 128,-128 a 128,128 0 0,1 128,128 a 64,64 0 0,1 -64,64 a 64,64 0 0,0 -64,64 a 64,64 0 0,0 64,64 a 128,128 0 0,0 128,-128 l 0,-128 a 128,128 0 0,0 -128,-128 l -128,0 a 128,128 0 0,0 -128,128 a 64,64 0 0,1 -64,64 a 64,64 0 0,0 -64,64 a 192,192 0 0,0 192,192 a 128,128 0 0,1 128,128'
    }
  ],
  segmentsAtSelectedPosition: [],
  tileSize: 64
}


export default new Vuex.Store({
  state,
  getters: {
    builderStage: state => {
      return state.builderStage
    },
    currentSegment: state => {
      return state.currentSegment
    },
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
    },
    getCurrentSegment: state => {
      return state.currentSegment
    }
  },
  mutations: {
    createLabyrinthSegment(state, payload) {
      // NOTE: position is actually state.currentPosition, so it could just come from here instead of a param
      state.labyrinthSegments.push({ ...payload.position, path: payload.path })
    },
    deleteCurrentSegment(state) {
      if (typeof state.currentSegmentIndex === 'number') {
        state.labyrinthSegments.splice(state.currentSegmentIndex, 1)
        state.currentSegmentIndex = null
        state.currentSegment = null
      }
    },
    removeLastSegment(state) {
      state.labyrinthSegments.pop()
    },
    setBuilderStage(state, payload) {
      state.builderStage = payload
    },
    setCurrentPosition(state, payload) {
      state.currentPosition = payload
    },
    setCurrentSegment(state, payload) {
      state.currentSegment = payload.segment
      state.currentSegmentIndex = payload.index
      state.builderStage = Stage.Editing
    },
    unsetCurrentSegment(state) {
      state.currentSegment = null
      state.currentSegmentIndex = null
    }
  },
  actions: {
  },
  modules: {
  }
})

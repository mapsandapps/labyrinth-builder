import Vue from 'vue'
import Vuex from 'vuex'
import { filter } from 'lodash'
import { Position, StoreState } from './types'

Vue.use(Vuex)


const state: StoreState = {
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
      path: 'a 64,64 0 0,1 64,64'
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
  nextSegmentPosition: null,
  segmentsAtSelectedPosition: [],
  tileSize: 64
}

export default new Vuex.Store({
  state,
  getters: {
    getAllSegments: state => {
      return state.labyrinthSegments.map(s => {

        return {
          x: s.x,
          y: s.y,
          z: s.z,
          path: `M ${state.tileSize * (s.x - 1)},${state.tileSize * (s.y - 1)}` + ' ' + s.path + ' '
        }
      })
    },
    getLabyrinthPath: state => {
      let labyrinthPath: string = ''

      state.labyrinthSegments.map(s => {
        labyrinthPath += `M ${state.tileSize * (s.x - 1)},${state.tileSize * (s.y - 1)}` + ' '
        labyrinthPath += s.path + ' '
      })

      return labyrinthPath
    },
    getSegmentsAtPosition: state => (position: Position) => {
      return filter(state.labyrinthSegments, segment => {
        return segment.x === position.x && segment.y === position.y
      })
    }
  },
  mutations: {
    setNextSegmentPosition(state, payload) {
      state.nextSegmentPosition = payload
      state.segmentsAtSelectedPosition = filter(state.labyrinthSegments, segment => {
        console.log(segment)
        console.log(payload)
        return segment.x === payload.x && segment.y === payload.y
      })
    }
  },
  actions: {
  },
  modules: {
  }
})

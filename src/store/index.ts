import { range } from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import { consolidateSegments } from '../preview-utils'
import { Stage, StoreState } from './types'

Vue.use(Vuex)

const state: StoreState = {
  builderStage: Stage.Starting,
  currentPosition: null,
  currentSegment: null,
  currentSegmentIndex: null,
  error: null,
  labyrinthPath: null,
  labyrinthSegments: [
    // { x: 320, x1: 448,
    //   y: 768, y1: 768,
    //   z: 0, z1: 0,
    //   path: "l 128,0" },
    // { x: 128, x1: 128,
    //   y: 512, y1: 448,
    //   z: 0, z1: 0,
    //   path: "l 0,-64" },
    // { x: 512, x1: 576,
    //   y: 768, y1: 704,
    //   z: 0, z1: 0,
    //   path: "a 64,64 0 0,0 64,-64" },
    // { x: 512, x1: 448,
    //   y: 768, y1: 768,
    //   z: 0, z1: 0,
    //   path: "l -64,0" },
    // { x: 128, x1: 320,
    //   y: 512, y1: 704,
    //   z: 0, z1: 0,
    //   path: "a 192,192 0 0,0 192,192" },
    // { x: 320, x1: 320,
    //   y: 704, y1: 768,
    //   z: 0, z1: 0,
    //   path: "l 0,64" }
  ],
  segmentsAtSelectedPosition: [],
  success: null,
  TILE_SIZE: 64,
  WIDTH: 960,
  HEIGHT: 960
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
    getLabyrinthPath: state => {
      return state.labyrinthPath
    },
    grid: state => {
      return {
        xs: range(0, state.WIDTH + 1, state.TILE_SIZE),
        ys: range(0, state.HEIGHT + 1, state.TILE_SIZE)
      }
    },
    getAllSegments: state => {
      return state.labyrinthSegments.map(s => {
        return {
          ...s,
          path: `M ${s.x},${s.y}` + ' ' + s.path
        }
      })
    },
    getCurrentSegment: state => {
      return state.currentSegment
    },
    getError: state => {
      return state.error
    },
    getSuccess: state => {
      return state.success
    }
  },
  mutations: {
    createLabyrinthSegment(state, payload) {
      state.labyrinthSegments.push(payload)
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
      state.error = null
      state.builderStage = payload
      if (payload === 'PREVIEWING') {
        consolidateSegments(state.labyrinthSegments)
      }
    },
    setCurrentPosition(state, payload) {
      state.currentPosition = payload
    },
    setCurrentSegment(state, payload) {
      state.currentSegment = payload.segment
      state.currentSegmentIndex = payload.index
      state.builderStage = Stage.Editing
    },
    setError(state, payload) {
      state.error = payload
    },
    setLabyrinthPath(state, payload) {
      state.labyrinthPath = payload
    },
    setSuccess(state, payload) {
      state.success = payload
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

<template>
<div class="grid">
  <svg
    width="500px" height="500px" :viewBox="`0 0 ${width} ${height}`"
    xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle
      v-if="!awaitingSelection"
      :cx="currentPosition.x"
      :cy="currentPosition.y"
      r="8"
      fill="blue" />
    <g
      v-for="y in grid.ys"
      v-bind:key="'row-' + y">
      <circle
        v-for="x in grid.xs"
        v-bind:key="'column' + x"
        :cx="x"
        :cy="y"
        :r="pointRadius"
        :fill="getPointFill(x, y)"
        @click="selectPoint(x, y)" />
    </g>
  </svg>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'Grid',
  computed: {
    awaitingSelection() {
      return !Boolean(this.currentPosition)
    },
    currentPosition() {
      return store.getters.currentPosition
    },
    grid() {
      return store.getters.grid
    },
    pointRadius() {
      return this.awaitingSelection ? 12 : 5
    },
    tileSize() {
      return store.state.TILE_SIZE
    },
    width() {
      return store.state.WIDTH
    },
    height() {
      return store.state.HEIGHT
    }
  },
  methods: {
    getPointFill: function(x, y) {
      if (this.awaitingSelection) {
        return 'red'
      }
      if (x === this.currentPosition.x && y === this.currentPosition.y) {
        return 'red'
      }
      return 'gray'
    },
    selectPoint: function(column, row) {
      let position = {
        x: column,
        y: row,
        z: 0
      }
      store.commit('setCurrentPosition', position)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.grid {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>

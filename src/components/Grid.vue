<template>
<div class="grid">
  <svg
    width="500px" height="500px" viewBox="0 0 960 960"
    xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle
      v-if="!awaitingSelection"
      :cx="(currentPosition.x - 1) * tileSize"
      :cy="(currentPosition.y - 1) * tileSize"
      r="8"
      fill="blue" />
    <g
      v-for="y in columns + 1"
      v-bind:key="'row-' + y">
      <circle
        v-for="x in columns + 1"
        v-bind:key="'column' + x"
        :cx="(x - 1) * tileSize"
        :cy="(y - 1) * tileSize"
        :r="pointRadius"
        :fill="getPointFill(x, y)"
        @click="selectPoint(x, y)" />
    </g>
  </svg>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store';

export default {
  name: 'Grid',
  components: {
  },
  props: {
  },
  data() {
    return {
      columns: 15 // TODO: store in the store
    };
  },
  computed: {
    awaitingSelection() {
      return !Boolean(this.currentPosition)
    },
    currentPosition() {
      return store.getters.currentPosition
    },
    pointRadius() {
      return this.awaitingSelection ? 12 : 5
    },
    tileSize() {
      return store.state.tileSize
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
        y: row
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

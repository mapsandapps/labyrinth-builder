<template>
<div class="labyrinth">
  <svg
    overflow="visible"
    width="500px" height="500px" viewBox="0 0 960 960"
    xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path
      v-if="currentSegment"
      :class="currentSegment.path"
      key="currentSegment"
      :d="currentSegment.path"
      fill="none"
      stroke="red"
      stroke-width="16" />
    <path
      v-if="labyrinthPath"
      class="labyrinth-path"
      key="path"
      :d="labyrinthPath"
      fill="none"
      stroke="#308732"
      stroke-width="20" />
    <g
      v-else
      v-for="zLevel in segmentsStackedByZIndex"
      :key="zLevel.zIndex">
      <path
        v-for="segment in zLevel.segments"
        :class="segment.path"
        :key="segment.path"
        :d="segment.path"
        fill="none"
        stroke="orange"
        :stroke-opacity="zLevel.active ? 1 : 0.5"
        stroke-width="10"
        @click="selectSegment(segment, index)"  />
    </g>
  </svg>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store';

export default {
  name: 'Labyrinth',
  computed: {
    ...mapGetters({
      currentSegment: 'getCurrentSegment',
      labyrinthPath: 'getLabyrinthPath',
      segmentsStackedByZIndex: 'getSegmentsStackedByZIndex'
    })
  },
  methods: {
    isSegmentActive(segment) {
      return store.commit('isSegmentActive', segment)
    },
    selectSegment: function(segment, index) {
      store.commit('setCurrentSegment', {
        segment,
        index
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.labyrinth {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>

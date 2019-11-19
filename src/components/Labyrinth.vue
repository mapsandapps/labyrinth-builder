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
      v-for="(segment, index) in labyrinthSegments"
      :class="segment.path"
      :key="segment.path"
      :d="segment.path"
      fill="none"
      stroke="green"
      stroke-width="10"
      @click="selectSegment(segment, index)" />
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
      labyrinthSegments: 'getAllSegments'
    })
  },
  methods: {
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

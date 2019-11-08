<template>
<div class="labyrinth">
  <svg
    overflow="visible"
    width="500px" height="500px" viewBox="0 0 960 960"
    xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path
      v-for="segment in labyrinthSegments"
      :class="segment.path"
      :key="segment.path"
      :d="segment.path"
      fill="none"
      stroke="green"
      stroke-width="10"
      @click="selectSegment(segment)" />
  </svg>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store';

export default {
  name: 'Labyrinth',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      labyrinthSegments: 'getAllSegments'
    })
  },
  methods: {
    selectSegment: function(segment) {
      console.log(segment)
    }
  },
  mounted() {
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

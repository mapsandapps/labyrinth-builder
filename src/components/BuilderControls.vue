<template>
<div id="builder-next-segment">
  <div v-if="!segmentSelected">
    Click a grid on the left to begin.
  </div>
  <div v-else-if="existingSegmentSelected">
    <BuilderEditSegment />
  </div>
  <div v-if="segmentSelected">
    <BuilderNextSegment />
  </div>
</div>
</template>

<script>
import store from '../store';
import BuilderEditSegment from '@/components/BuilderEditSegment.vue'
import BuilderNextSegment from '@/components/BuilderNextSegment.vue'

export default {
  name: 'BuilderControls',
  components: {
    BuilderEditSegment,
    BuilderNextSegment
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    existingSegmentSelected () {
      // TODO: if you click a button and there is already a segment there, select it and display the edit options
      return false
    },
    segmentSelected () {
      return Boolean(store.state.nextSegment)
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>

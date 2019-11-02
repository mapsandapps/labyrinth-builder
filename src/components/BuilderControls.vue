<template>
<div id="builder-next-segment">
  <div v-if="!segmentSelected">
    Click a grid on the left to begin.
  </div>
  <BuilderEditSegment />
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
    segmentSelected () {
      return Boolean(store.state.nextSegmentPosition)
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

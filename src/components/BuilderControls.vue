<template>
<div id="builder-next-segment">
  <div v-if="!segmentSelected">
    Click a point on the left to begin.
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
      return Boolean(store.getters.currentPosition)
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

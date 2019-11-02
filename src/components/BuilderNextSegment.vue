<template>
<div>
  {{ nextSegmentPosition }}
</div>
</template>

<script>
import store from '../store';

export default {
  name: 'BuilderNextSegment',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    nextSegmentPosition() {
      return store.state.nextSegmentPosition
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

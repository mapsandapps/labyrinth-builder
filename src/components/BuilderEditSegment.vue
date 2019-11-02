<template>
<div>
  {{ segmentsAtSelectedPosition }}
</div>
</template>

<script>
import store from '../store';

export default {
  name: 'BuilderEditSegment',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    segmentsAtSelectedPosition () {
      // TODO: if you click a button and there is already a segment there, select it and display the edit options
      return store.state.segmentsAtSelectedPosition
    },
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
<div>
  <mark
    v-if="error"
    class="secondary">
    Error:</mark>
  {{ error }}
</div>
</template>

<script>
import store from '../store'

export default {
  name: 'BuilderPreviewLabyrinth',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    error() {
      return store.getters.getError
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

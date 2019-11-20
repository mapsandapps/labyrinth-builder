<template>
<div>
  <mark
    v-if="success"
    class="tertiary">
    Success!</mark>
  <pre
    class="path-string">
    {{ success }}
  </pre>
  <mark
    v-if="error"
    class="secondary">
    Error:</mark>
  {{ error }}
</div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      error: 'getError',
      success: 'getSuccess'
    })
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.path-string {
  white-space: normal;
  line-height: 1.3em;
}
</style>

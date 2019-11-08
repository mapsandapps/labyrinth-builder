<template>
<div>
  {{ currentSegment }}
  <form>
    <button
      v-if="currentSegment"
      class="secondary"
      type="button"
      @click="deleteCurrentSegment">
      Delete this segment
    </button>
  </form>
  <button
    class="secondary"
    type="button"
    @click="cancel">
    Exit segment editing
  </button>
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
    currentSegment () {
      // TODO: if you click a button and there is already a segment there, select it and display the edit options
      return store.state.currentSegment
    },
  },
  methods: {
    cancel: function() {
      store.commit('unsetCurrentSegment')
      store.commit('setBuilderStage', 'STARTING')
    },
    deleteCurrentSegment: function() {
      store.commit('deleteCurrentSegment')
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
<div id="builder-controls">
  <div v-if="builderStage === 'ADDING'">
    Click a point on the left to add a new segment.
  </div>
  <div v-if="builderStage === 'EDITING'">
    Click a segment on the left to edit it.
  </div>
  <BuilderEditSegment v-if="builderStage === 'EDITING'" />
  <BuilderNextSegment v-if="pointSelected" />
  <BuilderPreviewLabyrinth v-if="builderStage === 'PREVIEWING'" />
  <div v-if="builderStage === 'STARTING'">
    <button @click="setStage('ADDING')">Add segments</button>
    <button @click="setStage('EDITING')">Edit segments</button>
    <br />
    <button @click="setStage('PREVIEWING')">Preview</button>
  </div>
  <button
    v-if="builderStage === 'PREVIEWING'"
    @click="stopPreviewing">
    Stop previewing
  </button>
</div>
</template>

<script>
import store from '../store';
import BuilderEditSegment from '@/components/BuilderEditSegment.vue'
import BuilderNextSegment from '@/components/BuilderNextSegment.vue'
import BuilderPreviewLabyrinth from '@/components/BuilderPreviewLabyrinth.vue'

export default {
  name: 'BuilderControls',
  components: {
    BuilderEditSegment,
    BuilderNextSegment,
    BuilderPreviewLabyrinth
  },
  computed: {
    builderStage() {
      return store.getters.builderStage
    },
    pointSelected() {
      return Boolean(store.getters.currentPosition)
    },
    segmentSelected() {
      return Boolean(store.getters.currentSegment)
    }
  },
  methods: {
    setStage(stage) {
      store.commit('setBuilderStage', stage)
    },
    stopPreviewing() {
      this.setStage('STARTING')
      store.commit('setLabyrinthPath', null)
    }
  }
};
</script>

<style lang="scss" scoped>
#builder-controls {
  max-width: 400px;
  width: 400px;
}
</style>

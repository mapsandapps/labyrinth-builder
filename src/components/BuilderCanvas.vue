<template>
  <div id="builder-canvas">
    <Labyrinth />
    <Grid v-if="builderStage === 'ADDING'" />
    {{ builderStage }}
  </div>
</template>

<script>
import store from '../store'
import Grid from '@/components/Grid.vue'
import Labyrinth from '@/components/Labyrinth.vue'

export default {
  name: 'BuilderCanvas',
  components: {
    Grid,
    Labyrinth
  },
  computed: {
    builderStage() {
      return store.getters.builderStage
    }
  },
}
</script>

<style lang="scss" scoped>
#builder-canvas {
  position: relative;
  margin: 32px;
  width: 500px;
  height: 500px;
  overflow: visible;
  border: 4px solid blueviolet;
}
</style>

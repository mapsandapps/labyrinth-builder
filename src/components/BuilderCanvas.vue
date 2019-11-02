<template>
  <div id="builder-canvas">
    <Labyrinth />
    <Grid />
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import Labyrinth from '@/components/Labyrinth.vue'

export default {
  name: 'BuilderCanvas',
  components: {
    Grid,
    Labyrinth
  }
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

<template>
  <div id="builder-canvas">
    <Grid />
    <Labyrinth />
    <!-- <ButtonGrid /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import ButtonGrid from '@/components/ButtonGrid.vue'
import Grid from '@/components/Grid.vue'
import Labyrinth from '@/components/Labyrinth.vue'

export default {
  name: 'BuilderCanvas',
  components: {
    // ButtonGrid,
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

<template>
  <div id="builder-canvas">
    <Grid />
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'

export default {
  name: 'BuilderCanvas',
  components: {
    Grid
  }
}
</script>

<style lang="scss" scoped>
#builder-canvas {
  padding: 32px;
  width: 500px;
  height: 500px;
}
</style>

<template>
  <div class="home">
    <BuilderCanvas msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BuilderCanvas from '@/components/BuilderCanvas.vue'

export default {
  name: 'home',
  components: {
    BuilderCanvas
  }
}
</script>

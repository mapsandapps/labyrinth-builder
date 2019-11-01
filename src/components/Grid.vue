<template>
<div>
  <svg width="500px" height="500px" viewBox="0 0 960 960"
      xmlns="http://www.w3.org/2000/svg" version="1.1">
    <line
      v-for="y in 14"
      v-bind:key="y"
      x1="0" :y1="tileSize * y" x2="960" :y2="tileSize * y"
      stroke="black"
      stroke-dasharray="4" />
    <line
      v-for="x in 14"
      v-bind:key="x"
      :x1="tileSize * x" y1="0" :x2="tileSize * x" y2="960"
      stroke="black"
      stroke-dasharray="4" />
    <line
      v-for="y in 15"
      v-bind:key="y"
      x1="0" :y1="tileSize * (y - 0.5)" x2="960" :y2="tileSize * (y - 0.5)"
      stroke="lightgray"
      stroke-dasharray="8" />
    <line
      v-for="x in 15"
      v-bind:key="x"
      :x1="tileSize * (x - 0.5)" y1="0" :x2="tileSize * (x - 0.5)" y2="960"
      stroke="lightgray"
      stroke-dasharray="8" />
  </svg>

</div>
</template>

<script>
export default {
  name: 'Grid',
  components: {
  },
  props: {
  },
  data() {
    return {
      tileSize: 64
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
</style>

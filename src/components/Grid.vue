<template>
<div class="grid">
  <svg width="500px" height="500px" viewBox="0 0 960 960"
      xmlns="http://www.w3.org/2000/svg" version="1.1">

    <line
      v-for="y in columns - 1"
      v-bind:key="'y-' + y"
      x1="0" :y1="tileSize * y" x2="960" :y2="tileSize * y"
      stroke="black"
      stroke-dasharray="4" />
    <line
      v-for="x in columns - 1"
      v-bind:key="'x-' + x"
      :x1="tileSize * x" y1="0" :x2="tileSize * x" y2="960"
      stroke="black"
      stroke-dasharray="4" />
    <line
      v-for="y in columns"
      v-bind:key="'y-thin-' + y"
      x1="0" :y1="tileSize * (y - 0.5)" x2="960" :y2="tileSize * (y - 0.5)"
      stroke="lightgray"
      stroke-dasharray="8" />
    <line
      v-for="x in columns"
      v-bind:key="'x-thin-' + x"
      :x1="tileSize * (x - 0.5)" y1="0" :x2="tileSize * (x - 0.5)" y2="960"
      stroke="lightgray"
      stroke-dasharray="8" />
    <rect
      x="1" y="1" width="958" height="958"
      fill="none" stroke="blue" stroke-width="2" />
  </svg>
  <div class="select-grid-buttons">
    <div
      v-for="row in columns"
      v-bind:key="'row-' + row"
      class="select-grid-buttons--row">
      <button
        v-for="column in columns"
        v-bind:key="'column' + column"
        class="select-grid-button"
        v-on:click="selectGridItem(column, row)" />
    </div>
  </div>
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
      columns: 15,
      tileSize: 64
    };
  },
  computed: {
  },
  methods: {
    selectGridItem: function(column, row) {
      console.log(`${column},${row}`)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.grid {
  position: relative;
}
.select-grid-buttons {
  position: absolute;
  top: 0px;
  left: 0px;

}
.select-grid-button {
  height: calc(500 / 960 * 64px);
  width: calc(500 / 960 * 64px);
  border-color: transparent;
  background-color: transparent;
}
</style>

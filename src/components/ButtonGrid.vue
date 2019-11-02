<template>
<div class="button-grid">
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
</template>

<script>
import store from '../store';

export default {
  name: 'ButtonGrid',
  components: {
  },
  props: {
  },
  data() {
    return {
      columns: 15 // TODO: store in the store
    };
  },
  computed: {
  },
  methods: {
    selectGridItem: function(column, row) {
      let position = {
        x: column,
        y: row
      }
      store.commit('setNextSegmentPosition', position)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.button-grid {
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

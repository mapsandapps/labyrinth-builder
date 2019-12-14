<template>
  <div id="app">
    <BuilderCanvas msg="Welcome to Your Vue.js + TypeScript App"/>
    <BuilderControls />
    <ZIndexFilters />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BuilderCanvas from './components/BuilderCanvas.vue';
import BuilderControls from './components/BuilderControls.vue';
import ZIndexFilters from './components/ZIndexFilters.vue';

@Component({
  components: {
    BuilderCanvas,
    BuilderControls,
    ZIndexFilters
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('./assets/reset.css');
@import url('../node_modules/mini.css/dist/mini-default.min.css');

#app {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>

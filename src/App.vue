<template>
  <div id="app">
    <BuilderCanvas msg="Welcome to Your Vue.js + TypeScript App"/>
    <BuilderControls />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BuilderCanvas from './components/BuilderCanvas.vue';
import BuilderControls from './components/BuilderControls.vue';

@Component({
  components: {
    BuilderCanvas,
    BuilderControls
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('./assets/reset.css');
@import url('../node_modules/mini.css/dist/mini-default.min.css');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>

<template>
  <div id="app">
    <BuilderCanvas msg="Welcome to Your Vue.js + TypeScript App"/>
    <BuilderNextSegment />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BuilderCanvas from './components/BuilderCanvas.vue';
import BuilderNextSegment from './components/BuilderNextSegment.vue';

@Component({
  components: {
    BuilderCanvas,
    BuilderNextSegment
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('./assets/reset.css');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>

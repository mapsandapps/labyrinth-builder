<template>
<div id="z-index-filters">
  Z-indexes
  <button
    v-for="level in zLevels"
    :key="level.zIndex"
    :class="level.active ? 'primary' : ''"
    @click="toggleActive(level)">
    {{ level.zIndex }}
  </button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'ZIndexFilters',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      zLevels: 'zLevels'
    })
  },
  methods: {
    toggleActive(level) {
      store.commit('toggleZ', level.zIndex)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
#z-index-filters {
  margin: 0px 32px 32px;
}
</style>

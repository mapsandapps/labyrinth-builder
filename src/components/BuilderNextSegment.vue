<template>
<div class="builder-next-segment">
  <div>
    <h2>Add/edit segment</h2>
    <p>Click a point on the left to add a new segment.</p>
    <form v-if="currentPosition">
      <fieldset>
        <legend>Type</legend>
        <div class="row">
          <div class="col-sm-3">
            <label for="next-segment--type-curve">Curve</label>
          </div>
          <div class="col-sm">
            <input
              v-model="type"
              id="next-segment--type-curve"
              type="radio"
              name="type"
              value="curve" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <label for="next-segment--type-line">Line</label>
          </div>
          <div class="col-sm">
            <input
              v-model="type"
              id="next-segment--type-line"
              type="radio"
              name="type"
              value="line" />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Size</legend>
        <div v-if="type === 'curve'" class="row">
          <div class="col-sm-3">
            <label for="next-segment--radius">Radius</label>
          </div>
          <div class="col-sm">
            <input
              v-model="radius"
              id="next-segment--radius"
              type="number"
              min="0"
              step="1" />
          </div>
        </div>
        <div v-else-if="type === 'line'">
          <div class="row">
            <div class="col-sm-3">
              <label for="next-segment--width">Width</label>
            </div>
            <div class="col-sm">
              <input
                v-model="width"
                id="next-segment--width"
                type="number"
                min="0"
                step="1" />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <label for="next-segment--height">Height</label>
            </div>
            <div class="col-sm">
              <input
                v-model="height"
                id="next-segment--height"
                type="number"
                min="0"
                step="1" />
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Direction</legend>
        <div
          v-for="directionOption in directionOptions"
          :key="directionOption.value"
          class="row">
          <div class="col-sm-3">
            <label
              :for="`next-segment--direction-${directionOption.value}`"
              v-html="directionOption.label" />
          </div>
          <div class="col-sm">
            <input
              v-model="direction"
              :id="`next-segment--direction-${directionOption.value}`"
              type="radio"
              name="direction"
              :value="directionOption.value" />
          </div>
        </div>
      </fieldset>
      <fieldset v-if="type === 'curve'">
        <legend>Rotation</legend>
        <div class="row">
          <div class="col-sm-3">
            <label for="next-segment--rotation-cw">&#x21BB; (cw)</label>
          </div>
          <div class="col-sm">
            <input
              v-model="rotation"
              id="next-segment--rotation-cw"
              type="radio"
              name="rotation"
              value="CW" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <label for="next-segment--rotation-ccw">&#x21BA; (ccw)</label>
          </div>
          <div class="col-sm">
            <input
              v-model="rotation"
              id="next-segment--type-ccw"
              type="radio"
              name="rotation"
              value="CCW" />
          </div>
        </div>
      </fieldset>
      <button
        v-if="valid"
        class="tertiary"
        type="button"
        data-cy="place-segment-button"
        @click="placeSegment">
        Place segment
      </button>
      <button
        class="secondary"
        type="button"
        @click="undo">
        Remove last segment
      </button>
    </form>
  </div>
  <div>
    {{ currentPosition }}
  </div>
  <button
    class="secondary"
    type="button"
    @click="cancel">
    Exit segment creation
  </button>
</div>
</template>

<script>
import store from '../store'
import { buildCurve, buildLine, validateSegment } from '../utils'
import { mapGetters } from 'vuex'

export default {
  name: 'BuilderNextSegment',
  components: {
  },
  props: {
  },
  data() {
    return {
      direction: null,
      height: 0,
      radius: 1,
      rotation: 'CW',
      type: null,
      width: 0
    };
  },
  computed: {
    ...mapGetters({
      currentPosition: 'currentPosition',
      pointSelected: 'pointSelected'
    }),
    directionOptions() {
      if (!this.type) {
        return null
      }
      if (this.type === 'line' && !this.width && !this.height) {
        return null
      }
      if (this.type === 'curve') {
        return [
          { value: 'up-left', label: '&#x2196;' },
          { value: 'up-right', label: '&#x2197;' },
          { value: 'down-right', label: '&#x2198;' },
          { value: 'down-left', label: '&#x2199;' }
        ]
      } else if (this.width > 0 && this.height > 0) {
        return [
          { value: 'up-left', label: '&#x2196;' },
          { value: 'up-right', label: '&#x2197;' },
          { value: 'down-right', label: '&#x2198;' },
          { value: 'down-left', label: '&#x2199;' }
        ]
      } else if (this.height > 0) {
        return [
          { value: 'up', label: '&#x2191;' },
          { value: 'down', label: '&#x2193;' },
        ]
      } else if (this.width > 0) {
        return [
          { value: 'left', label: '&#x2190;' },
          { value: 'right', label: '&#x2192;' },
        ]
      }
    },
    tileSize() {
      return store.state.TILE_SIZE
    },
    valid() {
      return validateSegment(this.type, this.direction, this.height, this.radius, this.rotation, this.width)
    }
  },
  methods: {
    cancel: function() {
      store.commit('setCurrentPosition', null)
      store.commit('setBuilderStage', 'STARTING')
    },
    placeSegment: function() {
      if (this.type === 'curve') {
        let segment = buildCurve(this.currentPosition, this.direction, this.radius, this.rotation)
        store.commit('createLabyrinthSegment', segment)
      } else if (this.type === 'line') {
        let segment = buildLine(this.currentPosition, this.direction, this.height, this.width)
        store.commit('createLabyrinthSegment', segment)
      }
    },
    undo: function() {
      store.commit('removeLastSegment')
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.builder-next-segment {
  border: 1px solid black;
  margin: 32px 32px 32px 0px;
  text-align: left;
}
</style>

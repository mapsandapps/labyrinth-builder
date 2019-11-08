<template>
<div class="builder-next-segment">
  <div>
    <h2>Add/edit segment</h2>
    <form>
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
              value="cw" />
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
              value="ccw" />
          </div>
        </div>
      </fieldset>
      <button
        v-if="valid"
        class="tertiary"
        type="button"
        @click="placeSegment">
        Place segment
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
    Cancel segment creation
  </button>
</div>
</template>

<script>
import store from '../store';
import { buildCurve, buildLine } from '../utils'

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
      rotation: 'cw',
      type: null,
      width: 0
    };
  },
  computed: {
    currentPosition() {
      return store.getters.currentPosition
    },
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
      } else if (this.width === 0) {
        return [
          { value: 'up', label: '&#x2191;' },
          { value: 'down', label: '&#x2193;' },
        ]
      } else if (this.height === 0) {
        return [
          { value: 'left', label: '&#x2190;' },
          { value: 'right', label: '&#x2192;' },
        ]
      }
    },
    valid() {
      if (this.type === 'curve' && this.radius > 0) {
        if (this.direction === 'up-right' || this.direction === 'up-left' || this.direction === 'down-right' || this.direction === 'down-left') {
          if (this.rotation === 'cw' || this.rotation === 'ccw') {
            return true
          }
        }
      } else if (this.type === 'line' && (this.width > 0 || this.height > 0)) {
        if (this.direction === 'up' || this.direction === 'down' || this.direction === 'left' || this.direction === 'right') {
          return true
        }
      }
      return false
    }
  },
  methods: {
    cancel: function() {
      store.commit('setCurrentPosition', null)
    },
    placeSegment: function() {
      if (this.type === 'curve') {
        let path = buildCurve(this.direction, this.radius, this.rotation)
        console.log(path)
        store.commit('createLabyrinthSegment', {
          path,
          position: this.currentPosition
        })
      } else if (this.type === 'line') {
        buildLine()
      }
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

<template>
  <div class="manipulations-wrapper">
    <h3>Манипуляции</h3>
    <ul class="list list_manipulations">
      <li
        class="list-item list-item_manipulation"
        v-for="(manipulation, index) in manipulations"
        :key="'manipulation' + index"
      >
        {{ manipulation.name }}
        <b-tooltip
          :label="getReagentsForManipulationByIndex(index)"
          position="is-bottom"
          size="is-large"
          multilined
        >
          <b-button rounded @click="emitAddManipulation(manipulation)">
            <span class="fas fa-plus"></span>
          </b-button>
        </b-tooltip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Manipulation from "@/shared/classes/manipulation";

const ManipulationProps = Vue.extend({
  props: {
    manipulations: {
      type: Array as () => Manipulation[],
      default: []
    }
  }
});
@Component({})
export default class ManipulationsList extends ManipulationProps {
  emitAddManipulation(manipulation: Manipulation) {
    this.$emit("addManipulationEvent", manipulation);
  }

  getReagentsForManipulationByIndex(manipulationIndex: number): string {
    return this.manipulations[manipulationIndex].reagents
      .map((r: any) => r.name)
      .join(", ");
  }
}
</script>
<style lang="scss" scoped>
.list-item_manipulation {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<template>
  <li
    class="list-item list-item_custom"
    v-bind:class="{
      'list-item_custom_selected': isSelectManipulation
    }"
  >
    <h2>Манипуляция: {{ manipulation.name }}</h2>
    <h2>Активный зуб: {{ manipulation.tooth }}</h2>

    <b-button
      class="close-button"
      type="is-danger"
      @click="emitDeleteManipulation"
      ><span class="fas fa-times"></span
    ></b-button>
    <b-field grouped group-multiline :data-index="manipulationIndex">
      <draggable
        :group="{ name: dragGroupName, pull: false }"
        :sort="false"
        :list="manipulation.reagents"
        @add="emitAddReagent"
      >
        <b-tag
          v-for="(reagent, reagentIndex) in manipulation.reagents"
          :key="'addedReagent' + reagentIndex"
          type="is-primary"
          closable
          @close="emitDeleteReagent(reagentIndex)"
          aria-close-label="Close tag"
        >
          <div class="tag-reagent-wrapper">
            <label class="custom-label">{{ reagent.name }}</label>
            <b-input
              class="custom-numeric"
              type="number"
              :value="reagent.quantity"
              @input="
                emitChangeReagentCount(manipulationIndex, reagentIndex, $event)
              "
              min="1"
            ></b-input>
          </div>
        </b-tag>
      </draggable>
    </b-field>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import draggable from "vuedraggable";
import { Prop } from "vue-property-decorator";
const ManipulationProps = Vue.extend({
  props: {
    manipulation: {
      type: Object,
      default: () => {}
    },
    dragGroupName: String,
    isSelectManipulation: Boolean
  }
});
@Component({
  components: {
    draggable
  }
})
export default class ManipulationsList extends ManipulationProps {
  @Prop({ default: 0 }) manipulationIndex!: Number;

  emitAddReagent(event: any): void {
    this.$emit("addReagentEvent", event);
  }

  emitDeleteReagent(index: number) {
    this.$emit("deleteReagentEvent", index);
  }

  emitDeleteManipulation(index: number) {
    this.$emit("deleteManipulationEvent", index);
  }

  emitChangeReagentCount(
    manipulationIndex: any,
    reagentIndex: any,
    event: any
  ) {
    this.$emit("changeReagentCountEvent", {
      manipulationIndex,
      reagentIndex,
      event
    });
  }
}
</script>
<style lang="scss" scoped>
.close-button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px 4px;
  height: auto;
  line-height: 0;
}
.list-item_custom {
  position: relative;
  &_selected {
    background-color: #b9e0ff;
  }
  &:after {
    content: "";
    display: table;
    height: 10px;
  }
}

.tag-reagent-wrapper {
  display: flex;
  align-items: center;
}
</style>

<template>
  <div class="board__column">
    <h3 class="label">{{ label }}</h3>
    <draggable
      class="draggable_zone"
      :data-type="type"
      :list="manipulations"
      :group="dragName"
      :draggable="isDraggable ? '.card' : ''"
      :sort="false"
      @add="emitMoveCard"
    >
      <Card
        v-for="manipulation in manipulations"
        :key="manipulation.refId"
        :manipulation="manipulation"
        :isDraggable="isDraggable"
        :isAllowOpenAppointment="isAllowOpenAppointment"
        @openAppointment="emitopenAppointment"
      />
    </draggable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch, Emit } from "vue-property-decorator";

import Card from "@/components/manipulations-list/ManipulationsBoard/Card.vue";
import draggable from "vuedraggable";
import Manipulation from "@/shared/classes/manipulation";
@Component({
  components: {
    Card,
    draggable
  },
  name: "manipulations-board"
})
export default class TreatmentPlans extends Vue {
  //TODO: when start to drag item, display zones, where we can put the element
  @Prop({ default: () => "" }) label!: string;
  @Prop({ default: () => "" }) type!: string;
  @Prop({ default: () => "" }) dragName!: string;
  @Prop({ default: () => [] }) manipulations!: Manipulation[];
  @Prop({ default: () => true }) isDraggable!: boolean;
  @Prop({ default: () => false }) isAllowOpenAppointment!: boolean;

  @Emit("moveCard") emitMoveCard(event: Event) {
    return event;
  }

  @Emit("openAppointment") emitopenAppointment(id: number) {
    return id;
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
.board__column {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  width: 19%;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}
.card + .card {
  margin-top: 15px;
}

.label {
  font-size: 1.2rem;
  font-weight: 300;
}

.draggable_zone {
  min-height: 200px;
  width: 100%;
}
</style>

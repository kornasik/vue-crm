<template>
  <div class="container">
    <div class="notification">
      <h1 class="title is-2">План лечения</h1>
      <div v-if="addedManipulations.length" class="container">
        <ul class="list">
          <TreatmentPlanManipulation
            v-for="(manipulation, index) in addedManipulations"
            :manipulation="manipulation"
            :isSelectManipulation="isSelectManipulation(manipulation.tooth)"
            :dragGroupName="dragGroupName"
            :key="'addedManipulation' + index"
            :manipulationIndex="index"
            @deleteReagentEvent="deleteReagent($event, index)"
            @deleteManipulationEvent="deleteManipulation(index)"
            @addReagentEvent="emitAddReagent"
            @changeReagentCountEvent="changeReagentQuantity"
          />
        </ul>

        <div class="plan-footer">
          <div class="discount">
            <p>Применить купон</p>
            <b-input></b-input>
            <b-button type="is-success">Применить</b-button>
          </div>
          <div class="discount__sum">
            <span>Стоимость</span>
            <span>{{ totalTreatmentSum }}</span>
          </div>
          <div class="discount__sum discount__sum_bold">
            <span>Итоговая стоимость со скидкой</span>
            <span>{{ totalTreatmentSum }}</span>
          </div>
        </div>
      </div>
      <p v-else>Добавьте манипуляции для выбранного зуба</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Reagent } from "@/shared/classes/reagent";
import TreatmentPlanManipulation from "./TreatmentPlanManipulation.vue";

@Component({
  components: {
    TreatmentPlanManipulation
  }
})
export default class ManipulationsList extends Vue {
  @Prop({ default: [] }) addedManipulations!: any;
  @Prop({ default: "" }) dragGroupName!: String;
  @Prop({ default: 0 }) selectedTooth!: Number;

  emitAddReagent(event: any): void {
    this.$emit("addReagentEvent", event);
  }

  isSelectManipulation(toothIndex: number): boolean {
    return this.selectedTooth === toothIndex;
  }

  deleteReagent(reagentIndex: number, manipulationIndex: number) {
    if (confirm("Удалить реагент из манипуляции?")) {
      this.addedManipulations[
        manipulationIndex
      ].reagents = this.addedManipulations[manipulationIndex].reagents.filter(
        (r: Reagent, index: number) => index !== reagentIndex
      );
    }
  }

  deleteManipulation(manipulationIndex: number) {
    if (confirm("Удалить манипуляцию?")) {
      this.addedManipulations.splice(manipulationIndex, 1);
    }
  }

  get totalTreatmentSum(): number {
    let sum = 0;
    this.addedManipulations.forEach((m: any) => {
      m.reagents.forEach((r: Reagent) => {
        sum += r.price * (r.quantity ? r.quantity : 1);
      });
    });
    return sum;
  }
  changeReagentQuantity(changedReagent: any) {
    const { manipulationIndex, reagentIndex, event } = changedReagent;
    this.addedManipulations[manipulationIndex].reagents[
      reagentIndex
    ].quantity = event;
  }
}
</script>
<style lang="scss" scoped>
.discount {
  display: flex;
  justify-content: space-between;

  &__sum {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__bold {
      font-weight: 700;
    }
  }
}
</style>

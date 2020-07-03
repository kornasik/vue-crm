<template>
  <div class="bar">
    <b-tabs class="bar_tabs" v-model="selectedPlan" @input="emitTabChange">
      <b-tab-item
        v-for="(plan, i) in plans"
        :key="plan.id"
        :label="`${plan.name} ${plan.id}`"
      >
        <div class="tab_header" name="header">
          <span>
            <template v-if="selectedPlan !== 0">
              Приёмы и манипуляции
            </template>
            <b>{{ plan.name }}: </b>
          </span>
          <template v-if="selectedPlan !== 0">
            <o-button>Редактировать план</o-button>
          </template>
          <template v-else>
            <o-button>Добавить прием</o-button>
          </template>
        </div>
        <slot v-if="i === selectedPlan"></slot>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch, Emit } from "vue-property-decorator";
import Appointment from "@/shared/classes/appointment.model";
import OButton from "@/components/shared/OButton/OButton.vue";
@Component({
  components: {
    OButton
  },
  name: "plans-bar"
})
export default class PlansBar extends Vue {
  @Prop({ default: () => [] }) plans!: Appointment[];
  @Prop({ default: () => 0 }) value!: number;
  selectedPlan = 1;

  @Watch("value") changeSelectedTab() {
    this.selectedPlan = this.value;
  }
  @Emit("tabChange") emitTabChange(tabIndex: number) {
    this.$emit("input", tabIndex);
    return tabIndex;
  }
}
</script>
<style lang="scss" scoped>
.bar_tabs {
  width: 100%;
}

.tab_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

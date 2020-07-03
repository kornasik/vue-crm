<template>
  <div class="filter">
    <div class="column">
      <multiselect
        v-model="filters.doctors.selected"
        :options="filters.doctors.list"
        :multiple="true"
        :searchable="true"
        placeholder="Врач"
        @input="handleFilterChange('doctors', filters.doctors)"
        label="name"
        track-by="name"
      ></multiselect>
    </div>
    <div class="column">
      <multiselect
        v-model="filters.referrals.selected"
        :options="filters.referrals.list"
        :multiple="true"
        :searchable="true"
        placeholder="Направление"
        @input="handleFilterChange('referrals', filters.referrals)"
        label="name"
        track-by="name"
      ></multiselect>
    </div>
    <div class="column">
      <multiselect
        v-model="filters.dates.selected"
        :options="filters.dates.list"
        :multiple="true"
        :searchable="true"
        placeholder="Дата"
        @input="handleFilterChange('dates', filters.dates)"
        label="name"
        track-by="name"
      ></multiselect>
    </div>
    <div class="column">
      <multiselect
        v-model="filters.statuses.selected"
        :options="filters.statuses.list"
        :multiple="true"
        :searchable="true"
        placeholder="Статус оплаты"
        @input="handleFilterChange('statuses', filters.statuses)"
        label="name"
        track-by="name"
      ></multiselect>
    </div>
    <div class="column" sm="6">
      <o-input
        v-model.trim="filters.textSearch"
        :placeholder="'Поиск по слову'"
        @input="handleFilterChange('textSearch', filters.textSearch)"
        outlined
      ></o-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import OInput from "@/components/shared/OInput/OInput.vue";
import Component from "vue-class-component";
import ManipulationsFilter from "@/shared/classes/manipulations-filter.class";
import { Getter, Mutation, Action } from "vuex-class";
import { Prop, Watch, Emit } from "vue-property-decorator";
import Multiselect from "vue-multiselect";

@Component({
  components: {
    Multiselect,
    OInput
  },
  name: "manipulations-filter"
})
export default class TreatmentPlans extends Vue {
  @Prop({ default: () => new ManipulationsFilter() })
  value!: ManipulationsFilter;

  filters: ManipulationsFilter = new ManipulationsFilter();

  @Watch("value", { immediate: true, deep: true })
  handleValueChange(val: ManipulationsFilter, oldVal: ManipulationsFilter) {
    if (val) {
      this.filters = Object.assign({}, val);
    }
  }

  @Emit("filterChange") emitFilterChange() {
    return;
  }

  handleFilterChange(key: string, value: string | Multiselect) {
    this.emitValueChange(key, value);

    // TODO: why first action is emit and only after it value updates
    setTimeout(() => {
      this.emitFilterChange();
    });
  }

  @Emit("input") emitValueChange(key: string, value: string | Multiselect) {
    return { ...this.value, [key]: value };
  }
}
</script>
<style lang="scss" scoped>
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.filter {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #cfcfcf;
}
</style>

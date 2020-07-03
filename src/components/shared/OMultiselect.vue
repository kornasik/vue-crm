<template>
  <multiselect
    v-model="selectedItems"
    :options="options"
    :close-on-select="true"
    :clear-on-select="false"
    :preserve-search="true"
    :placeholder="placeholder"
    :multiple="true"
    :limit="2"
    track-by="id"
    label="name"
    @input="onInput($event)"
  >
  </multiselect>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import multiselect from "vue-multiselect";
@Component({
  name: "o-select",
  components: {
    multiselect
  }
})
export default class OSelect extends Vue {
  // TODO: check functionality
  @Prop({ default: "" }) value!: any;
  @Prop({ default: "" }) placeholder!: string;
  @Prop({ default: "true" }) required!: boolean;
  @Prop({ required: true }) options!: [];

  selectedItems: any[] = [];

  @Watch("value") handleValueChange() {
    this.selectedItems = { ...this.value };
  }
  onInput(newValue: any) {
    this.$emit("input", [...newValue]);
  }
}
</script>

<style scoped>
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.multiselect__content-wrapper {
  min-width: 150px;
}
</style>

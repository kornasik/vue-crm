<template>
  <b-switch :value="value" @input="onChange">
    <slot></slot>
  </b-switch>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "o-select"
})
export default class OSwitch extends Vue {
  @Prop({ default: "" }) value!: string;

  @Emit("input")
  onChange(value: string) {
    return value;
  }
}
</script>

<style scoped></style>

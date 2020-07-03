<template>
  <b-input
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="emitInputChange"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, PropSync } from "vue-property-decorator";

@Component({
  name: "o-input"
})
export default class OInput extends Vue {
  @Prop({ default: "text" }) type!: string;
  @Prop({ default: "" }) placeholder!: string;
  @Prop({ default: "" }) value!: string;
  @Prop({ default: false }) disabled!: boolean;

  @Emit("input")
  emitInputChange(value: string) {
    return value;
  }
}
</script>

<style scoped></style>

<template>
  <b-checkbox :true-value="value">
    <slot></slot>
  </b-checkbox>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "o-checkbox"
})
export default class OCheckbox extends Vue {
  // TODO: check functionality whene array
  @Prop({ default: false }) value!: boolean;
}
</script>

<style scoped></style>

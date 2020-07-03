<template>
  <b-field :type="type" :message="message" :label="label">
    <slot></slot>
  </b-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "o-input"
})
export default class OInput extends Vue {
  @Prop({ default: "" }) type!: string;
  @Prop({ default: "" }) message!: string;
  @Prop({ default: "" }) label!: string;
}
var o = {
  set a(value: any) {
    let val = value;
  }
};
</script>

<style scoped></style>

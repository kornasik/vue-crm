<template>
  <b-tab-item>
    <slot name="header"></slot>
    <slot></slot>
  </b-tab-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "o-tab-item"
})
export default class OTabItem extends Vue {
  @Prop({ default: "" }) label!: string;
}
</script>

<style scoped></style>

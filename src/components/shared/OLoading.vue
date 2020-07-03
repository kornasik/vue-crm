<template>
  <b-loading :is-full-page="false" :active.sync="isShow" :can-cancel="true" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "o-loading"
})
export default class OLoading extends Vue {
  @Prop({ default: true }) isShow!: boolean;
}
</script>

<style scoped></style>

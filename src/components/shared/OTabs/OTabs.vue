<template>
  <b-tab-item>
      <slot></slot>
  </b-tab-item>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({
    name: 'o-tabs'
  })
  export default class OTabs extends Vue {}
</script>

<style scoped>

</style>

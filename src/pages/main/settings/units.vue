<template>
  <div>
    <Breadcrumbs />
    <Units />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Units from "@/components/shared/Units.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
@Component({
  components: {
    Units,
    Breadcrumbs
  }
})
export default class UnitsView extends Vue {}
</script>
<style lang="scss"></style>

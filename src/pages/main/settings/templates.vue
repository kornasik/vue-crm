<template>
  <div>
    <Breadcrumbs />
    <Templates />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Templates from "@/components/shared/Templates/index.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
@Component({
  components: {
    Templates,
    Breadcrumbs
  }
})
export default class TemplatesView extends Vue {}
</script>
<style lang="scss"></style>

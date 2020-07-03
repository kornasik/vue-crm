<template>
  <div>
    <Breadcrumbs />
    <Manipulations />
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import Manipulations from "@/components/shared/Manipulations.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  name: "app-templates",
  components: {
    Breadcrumbs,
    Manipulations
  }
};
</script>

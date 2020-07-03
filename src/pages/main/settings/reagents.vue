<template>
  <div>
    <Breadcrumbs />
    <Reagents />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Reagents from "@/components/shared/Reagents.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
@Component({
  components: {
    Reagents,
    Breadcrumbs
  }
})
export default class ReagentsView extends Vue {
  crated() {
    debugger;
  }
}
</script>
<style lang="scss"></style>

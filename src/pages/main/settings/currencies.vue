<template>
  <div>
    <Breadcrumbs />
    <Currencies />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Currencies from "@/components/shared/Currencies.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
@Component({
  components: {
    Currencies,
    Breadcrumbs
  }
})
export default class CurrenciesView extends Vue {}
</script>
<style lang="scss"></style>

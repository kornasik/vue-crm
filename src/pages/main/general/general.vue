<template>
  <div>
    General module
    <ToothCard />
    <hr />
    <multiselect
      v-model="value"
      :options="options"
      :custom-label="nameWithLang"
      :multiple="true"
      :searchable="true"
      placeholder="Select one"
      label="name"
      track-by="name"
    ></multiselect>
    <!-- todos {{ categories }} -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation, Action } from "vuex-class";
import ToothCard from "@/components/tooth-card/ToothCard.vue";
import Multiselect from "vue-multiselect";
@Component({
  components: {
    ToothCard,
    Multiselect
  }
})
export default class MyComponent extends Vue {
  @Getter("CATEGORIES") categories: any;
  @Action("GET_CATEGORIES") getCategories: any;

  value = { name: "Vue.js", language: "JavaScript" };
  options = [
    { name: "Vue.js", language: "JavaScript" },
    { name: "Rails", language: "Ruby" },
    { name: "Sinatra", language: "Ruby" },
    { name: "Laravel", language: "PHP" },
    { name: "Phoenix", language: "Elixir" }
  ];

  mounted() {
    this.getCategories({ value: true });
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

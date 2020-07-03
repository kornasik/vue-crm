<template>
  <div :style="{ maxWidth: '200px' }">
    <input v-if="field.type === 'text'" type="text" v-model="field.value" />
    <input v-if="field.type === 'number'" type="text" v-model="field.value" />
    <input v-if="field.type === 'date'" type="date" v-model="field.value" />
    <v-select
      v-if="field.type === 'list'"
      :items="field.value"
      v-model="field.value"
      label="Select"
    />
    <v-select
      v-if="field.type === 'flag'"
      :items="field.value"
      v-model="field.value"
      label="Select"
    />
    <v-select
      v-if="field.type === 'multiselect'"
      :items="field.value"
      v-model="field.value"
      multiple
      chip
      label="Select"
    />
  </div>
</template>

<script>
export default {
  name: "RenderTypeInput",
  props: {
    field: Object
  },
  data: () => ({
    value: ""
  }),
  created() {
    this.value = this.field.value;
  },
  updated() {
    this.$store.commit("editDataContact", this.field);
  }
};
</script>

<style></style>

<template>
  <div :style="{ display: 'flex', padding: '5px' }">
    <div :style="{ width: '120px' }">
      <input
        type="text"
        v-model="labelField"
        :style="{ width: '100%' }"
        @blur="updateField"
      />
    </div>
    <textarea :style="{ width: '100%' }" />
    <b-icon
      pack="fas"
      icon="trash-alt"
      size="is-small"
      :style="{ margin: '5px 0 0 15px' }"
      @click.native="deleteField"
    >
    </b-icon>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";

@Component({
  props: {
    dataField: Object
  }
})
export default class SimpleTextarea extends Vue {
  dataField: any;
  labelField: string = this.dataField.label;

  deleteField() {
    api(httpClient).salesFunnel.delete(this.dataField.id);
    this.$emit("emitDeleteField");
  }

  updateField() {
    api(httpClient).salesFunnel.update({
      name: this.labelField.toLowerCase(),
      label: this.labelField,
      id: String(this.dataField.id)
    });
    this.$emit("emitUpdateField");
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="patient">
    <b-button
      :style="{ margin: '30px' }"
      type="is-primary"
      outlined
      @click.native="transitionToothCard"
      >Открыть зубную карту</b-button
    >
    <b-button
      :style="{ margin: '30px' }"
      type="is-primary"
      outlined
      @click.native="transitionDocuments"
    >Документы</b-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import api from "@/api/index.api";
import httpClient from '../../../../api/httpClient/httpClient';
@Component({})
export default class Patients extends Vue {
  user = {};
  mounted() {
    api(httpClient).patients.getById(+this.$route.params.id).then((res: any) => {
      this.user = res.data.patient;
    });
  }
  transitionToothCard() {
    this.$router.push(
      `${(this.$router as any).history.current.params.id}/tooth-card`
    );
  }
  transitionDocuments() {
    this.$router.push(`${(this.$router as any).history.current.params.id}/documents`);
  }
}
</script>

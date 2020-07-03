<template>
  <div class="patient">
    <PatientHeader v-if="user" :user="user" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PatientHeader from "@/components/PatientHeader.vue";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
@Component({
  components: {
    PatientHeader
  }
})
export default class Patients extends Vue {
  user = null;

  mounted() {
    api(httpClient)
      .patients.getById(+this.$route.params.id)
      .then((res: any) => {
        this.user = res.data.patients[0];
      });
  }
}
</script>
<style scoped>
.patient {
  height: 100%;
}
</style>

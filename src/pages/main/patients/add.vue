<template>
  <div class="addPatientForm">
    <AddPatient @createPatientEvent="handleCreatePatient($event)" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AddPatient from "@/components/patients/components/AddPatient.vue";
import { Patient } from "@/shared/classes/patient.model";
import { Getter, Action } from "vuex-class";
import {
  showSnackBar_danger,
  showSnackBar_success
} from "@/shared/notifications";
@Component({
  components: {
    AddPatient
  }
})
export default class AddPatientForm extends Vue {
  @Getter("patients/REF_ID") patientRef!: number;
  @Action("patients/CREATE_PATIENT") createPatient!: any;

  async handleCreatePatient(patient: Patient) {
    try {
      await this.createPatient(patient);
      this.$router.back();
      showSnackBar_success(this.$t("notifies.success").toString());
    } catch (e) {
      showSnackBar_danger(this.$t("notifies.failed").toString());
    }
  }
}
</script>

<style lang="scss" scoped>
.addPatientForm {
  margin: 25px;
}
</style>

<template>
  <v-container fluid>
    <v-checkbox
      v-model="this.$store.state.Schedule.shiftWork"
      :label="checkboxLabel"
      @click.stop="changeShiftWork"
    ></v-checkbox>
  </v-container>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    checkboxLabel: String
  },
  data() {
    return {};
  },
  methods: {
    changeShiftWork() {
      this.$store.commit("editShiftWork");
      if (
        this.$store.state.Schedule.weekDayShiftWork.even &&
        this.$store.state.Schedule.weekDayShiftWork.odd &&
        this.$store.state.Schedule.shiftWork
      ) {
        this.$axios
          .get(this.$store.state.apiDomain + "/medicine/schedule/list", {
            params: {
              doctor_id: this.$store.state.Schedule.selectedDoctorId,
              mode: "weekly"
            }
          })
          .then(response => {
            if (!(response.data.schedule === null)) {
              this.$store.commit("setDataDoctor", response.data.schedule[0]);
              this.$store.commit("changeStatusSchedule", "edit");
            } else {
              this.$store.commit("changeStatusSchedule", "add");
            }
          });
      }
    }
  }
};
</script>

<style></style>

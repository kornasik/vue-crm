<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-4">
        <ul class="list-group" :key="doctor.id" v-for="doctor in doctors">
          <li
            class="list-group-item list-group-item-action active-doctor"
            :class="{
              active: $store.state.Schedule.selectedDoctorId === doctor.id
            }"
            @click="setIdSelectedDoctor(doctor, doctor.id)"
          >
            {{ doctor.name.toUpperCase() }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    doctors: [],
    doctor: ""
  }),
  beforeCreate() {
    this.$axios
      .get(this.$store.state.apiDomain + "/medicine/doctors/list")
      .then(res => {
        if (res.status === 200) {
          this.doctors = res.data.doctors;
          this.doctor = res.data.doctors[0].name;
          this.$store.commit("setNameDoctor", this.doctor);
        } else {
          console.log("Error get patient form");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    setIdSelectedDoctor(doctor, id) {
      this.$store.commit("setNameDoctor", doctor.name);
      this.$store.commit("setIdSelectedDoctor", id);
      this.$store.state.Schedule.shiftWork = false;
      this.$axios
        .get(this.$store.state.apiDomain + "/medicine/schedule/list", {
          params: {
            doctor_id: id,
            mode: "daily"
          }
        })
        .then(response => {
          this.$store.commit("changeStatusSchedule", "add");
          if (!(response.data.schedule === null)) {
            this.$store.commit("setDataDoctor", response.data.schedule[0]);
            this.$store.commit("changeStatusSchedule", "edit");
          } else {
            this.$store.commit("cleanDataDoctor");
          }
        });
    }
  }
};
</script>

<style scoped>
.active-doctor {
  cursor: pointer;
}

ul {
  min-width: 300px;
}
</style>

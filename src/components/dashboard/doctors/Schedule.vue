<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col">
        <h1>Doctors Schedule</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <ul class="list-group" v-bind:key="doctor.id" v-for="doctor in doctors">
          <li
            class="list-group-item list-group-item-action"
            :class="{ active: selectedDoctorId === doctor.id }"
            @click="getSchedule(doctor.id)"
          >
            {{ doctor.name.toUpperCase() }}
          </li>
        </ul>
      </div>
      <div class="col-md-8">
        <vue-cal
          :events="events"
          :disable-views="['years', 'year', 'month']"
          style="height: 700px"
        ></vue-cal>
      </div>
    </div>
  </div>
</template>

<script>
import vuecal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "app",
  components: { "vue-cal": vuecal },
  data() {
    return {
      doctors: [],
      schedule: [],
      selectedDoctorId: 1,
      events: []
    };
  },
  methods: {
    getDoctors() {
      this.$axios
        .get(this.$store.state.apiDomain + "/medicine/doctors/list")
        .then(res => {
          if (res.status === 200) {
            this.doctors = res.data.doctors;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSchedule(id) {
      this.selectedDoctorId = id;
      this.$axios
        .get(
          this.$store.state.apiDomain +
            "/medicine/schedule/list?doctor_id=" +
            id
        )
        .then(res => {
          if (res.status === 200) {
            this.schedule = res.data.schedule;
            this.getEvents();
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getEvents() {
      if (this.events.length > 0) {
        this.events = [];
      }
      this.schedule.forEach(value => {
        value.dates.forEach(date => {
          if (value.exceptions.length > 0) {
            value.exceptions.forEach(exception => {
              if (exception.date === date) {
                let start = exception.date + " " + exception.start;
                let end = exception.date + " " + exception.end;
                let title = "Appointment Duration:";
                this.pushEvent(start, end, title);
              } else {
                let start = date + " " + value.start;
                let end = date + " " + value.end;
                let title = "Appointment Duration:";
                this.pushEvent(start, end, title);
              }
            });
          } else {
            let start = date + " " + value.start;
            let end = date + " " + value.end;
            let title = "Appointment Duration:";
            this.pushEvent(start, end, title);
          }
        });
      });
    },
    pushEvent(start, end, title) {
      let event = {
        start: start,
        end: end,
        title: title
      };
      this.events.push(event);
    }
  },
  mounted: function() {
    this.getDoctors();
    this.getSchedule(this.selectedDoctorId);
  }
};
</script>

<style>
.list-group-item,
.oi {
  cursor: pointer;
}
.vuecal {
  margin: auto;
  max-width: 1300px;
  max-height: 662px;
  height: 100%;
}

.vuecal__event {
  background: #069cfa none repeat scroll 0 0;
  border: 1px solid #069cfa;
  color: #fff;
}

.vuecal__menu {
  background-color: rgb(70, 159, 255);
  color: #fff;
}

.vuecal__title-bar {
  background-color: rgba(14, 160, 255, 0.23);
}
</style>

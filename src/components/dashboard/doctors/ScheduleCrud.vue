<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col">
        <h1>Schedule CRUD</h1>
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
        <div class="btn btn-primary pt-2" @click="createSchedule()">
          <span class="oi oi-plus" style="margin-right: 10px;"></span> New
        </div>
        <div class="row form" v-show="form">
          <form class="col-md-12" @submit.prevent>
            <div class="container line-margin">
              <div class="row">
                <div class="col-md-6 pt-5">
                  <label>Working Day</label>
                </div>
                <div class="col-md-6 pt-5">
                  <multiselect
                    v-model="values.working_day"
                    tag-placeholder="Add this as new working day"
                    placeholder="Search or add a working day"
                    :options="workingDayOptions"
                    :multiple="false"
                    :taggable="true"
                  ></multiselect>
                </div>
              </div>
              <div class="container line-margin">
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <label>Even Week?</label>
                  </div>
                  <div class="col-md-6 pt-2">
                    <input
                      v-model="values.week_parity"
                      type="checkbox"
                      placeholder="message"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="container line-margin">
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <label>Start</label>
                  </div>
                  <div class="col-md-6 pt-2">
                    <input
                      v-model="values.start"
                      type="time"
                      placeholder="message"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="container line-margin">
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <label>End</label>
                  </div>
                  <div class="col-md-6 pt-2">
                    <input
                      v-model="values.end"
                      type="time"
                      placeholder="message"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="container line-margin">
                <div class="row">
                  <div
                    class="btn btn-primary pt-2"
                    @click="addExceptionFields()"
                  >
                    <span class="oi oi-plus" style="margin-right: 10px;"></span>
                    Add Exception
                  </div>
                </div>
              </div>
              <div
                v-bind:key="exception.date"
                v-for="exception in this.values.exceptions"
              >
                <div class="container line-margin">
                  <div class="row">
                    <div class="col-md-6 pt-2">
                      <label>Date</label>
                    </div>
                    <div class="col-md-6 pt-2">
                      <input
                        v-model="exception.date"
                        type="date"
                        placeholder="message"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="container line-margin">
                  <div class="row">
                    <div class="col-md-6 pt-2">
                      <label>Start</label>
                    </div>
                    <div class="col-md-6 pt-2">
                      <input
                        v-model="exception.start"
                        type="time"
                        placeholder="message"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="container line-margin">
                  <div class="row">
                    <div class="col-md-6 pt-2">
                      <label>End</label>
                    </div>
                    <div class="col-md-6 pt-2">
                      <input
                        v-model="exception.end"
                        type="time"
                        placeholder="message"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-5">
              <button class="btn btn-success line-margin" @click="submit()">
                Save
              </button>
            </div>
          </form>
        </div>
        <div class="row" v-show="info">
          <div class="pt-2 col-sm-3">
            <button
              type="button"
              @click="filterSchedule(true)"
              class="btn btn-light pt-2"
            >
              Even Week
            </button>
          </div>
          <div class="pt-2 col-sm-3">
            <button
              type="button"
              @click="filterSchedule(false)"
              class="btn btn-dark pt-2"
            >
              Odd Week
            </button>
          </div>
        </div>
        <div class="row pt-5" v-show="schedules">
          <div
            class="col-sm-6"
            v-bind:key="day.id"
            v-for="day in filteredSchedule"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ day.day.toUpperCase() }}</h5>
                <p class="card-text">
                  Working Hours: {{ day.start }} - {{ day.end }}
                </p>
                <div v-if="day.exceptions.length" class="card-text">
                  <p>Exceptions:</p>
                  <div
                    v-bind:key="exception.id"
                    v-for="exception in day.exceptions"
                  >
                    <p>
                      {{ exception.start }} - {{ exception.end }},
                      {{ exception.date }}
                    </p>
                  </div>
                </div>
                <span
                  class="oi oi-trash"
                  @click="deleteSchedule(day.id)"
                  style="margin-right: 10px;"
                ></span>
                <span
                  class="oi oi-pencil"
                  @click="editSchedule(day)"
                  style="margin-right: 10px;"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "app",
  components: {
    Multiselect
  },
  data() {
    return {
      doctors: [],
      schedule: [],
      filteredSchedule: [],
      selectedDoctorId: 1,
      selectedWeek: true,
      selectedScheduleId: "",
      form: false,
      info: true,
      schedules: false,
      values: this.getEmptyValues(),
      workingDayOptions: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
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
      this.values = this.getEmptyValues();
      this.schedules = false;
      this.form = false;
      this.info = true;
      this.$axios
        .get(
          this.$store.state.apiDomain +
            "/medicine/schedule/list?doctor_id=" +
            id
        )
        .then(res => {
          if (res.status === 200) {
            this.schedule = this.filteredSchedule = res.data.schedule;
            this.filterSchedule(this.selectedWeek);
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createSchedule() {
      this.form = true;
      this.info = false;
      this.schedules = false;
      this.edit = false;
    },
    filterSchedule(week) {
      this.selectedWeek = week;
      this.filteredSchedule = this.schedule.filter(function(el) {
        return el.week_parity === week;
      });
      this.schedules = true;
    },
    getEmptyValues() {
      return {
        doctor_id: this.selectedDoctorId,
        working_day: "",
        week_parity: "",
        start: "",
        end: "",
        exceptions: []
      };
    },
    deleteSchedule(id) {
      var message = "Are you sure you want to delete schedule?";
      if (confirm(message)) {
        this.$axios
          .post(this.$store.state.apiDomain + "/medicine/schedule/delete", {
            id: id
          })
          .then(res => {
            if (res.status === 200 && res.data.errorCode === 0) {
              this.$notify({
                group: "app",
                text: "The schedule was deleted!",
                type: "success"
              });
              this.getSchedule(this.selectedDoctorId);
            } else {
              this.$notify({
                group: "error",
                text: res.data.errorMessage,
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    submit() {
      if (this.edit) {
        var text =
          "Are you sure you want to update schedule on " +
          this.values.working_day +
          " ?";
        if (confirm(text)) {
          this.$axios
            .put(
              this.$store.state.apiDomain +
                "/medicine/schedule/" +
                this.selectedScheduleId,
              this.values
            )
            .then(res => {
              if (res.status === 200 && res.data.errorCode === 0) {
                this.$notify({
                  group: "app",
                  text:
                    "The schedule on " +
                    this.values.working_day +
                    " was updated!",
                  type: "success"
                });
                this.getSchedule(this.selectedDoctorId);
                this.form = false;
              } else {
                this.$notify({
                  group: "error",
                  text: res.data.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        var even = this.values.week_parity ? "even" : "odd";
        var message =
          "Are you sure you want to create schedule on " +
          this.values.working_day +
          " for " +
          even +
          " week?";
        if (confirm(message)) {
          this.$axios
            .post(
              this.$store.state.apiDomain + "/medicine/schedule/create",
              this.values
            )
            .then(res => {
              if (res.status === 200 && res.data.errorCode === 0) {
                this.$notify({
                  group: "app",
                  text:
                    "The schedule on " +
                    this.values.working_day +
                    " was created!",
                  type: "success"
                });
                this.getSchedule(this.selectedDoctorId);
                this.form = false;
              } else {
                this.$notify({
                  group: "error",
                  text: res.data.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    addExceptionFields() {
      this.values.exceptions.push({ date: "", start: "", end: "" });
    },
    editSchedule(day) {
      this.edit = true;
      this.form = true;
      this.info = false;
      this.schedules = false;
      this.values.working_day = this.workingDayOptions.filter(function(el) {
        return el === day.day;
      })[0];
      this.values.week_parity = day.week_parity;
      this.values.start = day.start;
      this.values.end = day.end;
      this.values.exceptions = day.exceptions;
      this.selectedScheduleId = day.id;
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
</style>

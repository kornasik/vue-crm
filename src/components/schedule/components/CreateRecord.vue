<template>
  <div class="create-record">
    <div class="create-record__week-day">
      <div class="create-record__times">
        <div class="create-record__time start">Время начала</div>
        <div class="create-record__time end">Время конца</div>
      </div>
      <ul v-for="(day, dayIndex) in workingDayOptions" :key="dayIndex">
        <li>
          <WeekDay :index="dayIndex" :label="day" :edit="edit" />
        </li>
      </ul>
    </div>
    <div class="create-record__additional-schedule-wrapper">
      <v-btn
        v-if="!edit"
        large
        color="#3F51B5"
        class="create-record__add-additional-schedule"
        @click="addAdditionalSchedule"
      >
        <v-icon :style="{ marginRight: '10px' }">fas fa-plus-square</v-icon>
        Добавить исключение
      </v-btn>
      <AdditionalSchedule
        v-for="(item, index) in this.$store.state.Schedule.additional_schedule"
        :additionalSchedule="item"
        :index="index"
        :key="'exc' + index"
        :edit="edit"
      />
      <v-btn
        v-if="!edit"
        class="create-record__btn-save"
        color="#4CAF50"
        @click="saveScheduleWeek"
        >Save
      </v-btn>
    </div>
  </div>
</template>

<script>
import WeekDay from "../elements/WeekDay.vue";
import AdditionalSchedule from "../elements/AdditionalSchedule";

export default {
  name: "CreateRecord",
  components: {
    WeekDay,
    AdditionalSchedule
  },
  props: {
    edit: Boolean
  },
  data: () => ({
    workingDayOptions: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  }),
  methods: {
    addAdditionalSchedule() {
      this.$store.commit("setAdditionalSchedule");
    },
    saveScheduleWeek() {
      let weekDayShiftWork = {};
      let weekDay = {};
      const daily = this.$store.state.Schedule.weekDay.daily.filter(
        item => !(item.start === "" && item.end === "")
      );
      const even = this.$store.state.Schedule.weekDayShiftWork.even.filter(
        item => !(item.start === "" && item.end === "")
      );
      const odd = this.$store.state.Schedule.weekDayShiftWork.odd.filter(
        item => !(item.start === "" && item.end === "")
      );
      weekDay["daily"] = daily;
      weekDayShiftWork["even"] = even;
      weekDayShiftWork["odd"] = odd;
      if (this.$store.state.Schedule.statusSchedule === "add") {
        this.$axios.post(
          this.$store.state.apiDomain + "/medicine/schedule/create",
          {
            doctor_id: this.$store.state.Schedule.selectedDoctorId,
            mode: this.$store.state.Schedule.shiftWork ? "weekly" : "daily",
            schedule_week: this.$store.state.Schedule.shiftWork
              ? [weekDayShiftWork]
              : [weekDay],
            additional_schedule: this.$store.state.Schedule.additional_schedule
          }
        );
      }
      if (this.$store.state.Schedule.statusSchedule === "edit") {
        this.$axios.put(
          this.$store.state.apiDomain +
            `/medicine/schedule/${this.$store.state.Schedule.idSchedule}`,
          {
            doctor_id: this.$store.state.Schedule.selectedDoctorId,
            mode: this.$store.state.Schedule.shiftWork ? "weekly" : "daily",
            schedule_week: this.$store.state.Schedule.shiftWork
              ? [weekDayShiftWork]
              : [weekDay],
            additional_schedule: this.$store.state.Schedule.additional_schedule
          }
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
.create-record {
  width: fit-content;
  margin-top: 10px;

  &__week-day {
    width: max-content;
  }

  &__times {
    display: flex;
    width: fit-content;
    margin-left: auto;
    margin-bottom: 25px;
  }

  &__time {
    font-size: 12px;
    width: 40px;
    margin-right: 37px;
  }
  &__btn-save {
    max-width: 120px;
    margin: 20px auto;
    color: white;
  }

  &__add-additional-schedule {
    margin: 10px auto;
    max-width: 250px;
    color: white;
  }

  &__additional-schedule-wrapper {
    display: flex;
    flex-direction: column;
  }
}

li {
  list-style-type: none;
}
</style>

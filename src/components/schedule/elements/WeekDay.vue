<template>
  <div class="week-day__container">
    <div class="week-day__label">{{ label }}</div>
    <div class="week-day__time">
      <input
        type="time"
        @change="editTimeStart"
        :disabled="edit"
        v-model="start"
      />
      <input type="time" @change="editTimeEnd" :disabled="edit" v-model="end" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WeekDay",
  props: {
    label: String,
    edit: Boolean,
    index: Number
  },
  data: () => ({
    startTime: "",
    endTime: ""
  }),
  computed: {
    start() {
      if (this.$store.state.Schedule.weekDay.daily) {
        if (!this.$store.state.Schedule.shiftWork) {
          if (
            !(
              this.$store.state.Schedule.weekDay.daily[this.index] === undefined
            )
          ) {
            return this.$store.state.Schedule.weekDay.daily[this.index].start;
          }
        }
      }
      if (this.$store.state.Schedule.weekDayShiftWork.even) {
        if (this.$store.state.Schedule.shiftWork) {
          if (this.$store.state.Schedule.activeTab === "tab-even") {
            if (
              !(
                this.$store.state.Schedule.weekDayShiftWork.even[this.index] ===
                undefined
              )
            ) {
              return this.$store.state.Schedule.weekDayShiftWork.even[
                this.index
              ].start;
            }
          }
        }
      }
      if (this.$store.state.Schedule.weekDayShiftWork.odd) {
        if (this.$store.state.Schedule.activeTab === "tab-odd") {
          if (
            !(
              this.$store.state.Schedule.weekDayShiftWork.odd[this.index] ===
              undefined
            )
          ) {
            return this.$store.state.Schedule.weekDayShiftWork.odd[this.index]
              .start;
          }
        }
      }
      return "";
    },
    end() {
      if (this.$store.state.Schedule.weekDay.daily) {
        if (!this.$store.state.Schedule.shiftWork) {
          if (
            !(
              this.$store.state.Schedule.weekDay.daily[this.index] === undefined
            )
          ) {
            return this.$store.state.Schedule.weekDay.daily[this.index].end;
          }
        }
      }
      if (this.$store.state.Schedule.weekDayShiftWork.even) {
        if (this.$store.state.Schedule.shiftWork) {
          if (this.$store.state.Schedule.activeTab === "tab-even") {
            if (
              !(
                this.$store.state.Schedule.weekDayShiftWork.even[this.index] ===
                undefined
              )
            ) {
              return this.$store.state.Schedule.weekDayShiftWork.even[
                this.index
              ].end;
            }
          }
        }
      }
      if (this.$store.state.Schedule.weekDayShiftWork.odd) {
        if (this.$store.state.Schedule.activeTab === "tab-odd") {
          if (
            !(
              this.$store.state.Schedule.weekDayShiftWork.odd[this.index] ===
              undefined
            )
          ) {
            return this.$store.state.Schedule.weekDayShiftWork.odd[this.index]
              .end;
          }
        }
      }
      return "";
    }
  },
  methods: {
    setWeekDayTime(action) {
      return this.$store.commit(action, {
        day: this.dayInNumber(this.label),
        end: this.endTime,
        start: this.startTime
      });
    },
    editTimeStart(event) {
      this.startTime = event.target.value;
      if (this.$store.state.Schedule.shiftWork) {
        this.setWeekDayTime("setWeekDayShiftWork");
      } else {
        this.setWeekDayTime("setWeekDayTimes");
      }
    },
    editTimeEnd(event) {
      this.endTime = event.target.value;
      if (this.$store.state.Schedule.shiftWork) {
        this.setWeekDayTime("setWeekDayShiftWork");
      } else {
        this.setWeekDayTime("setWeekDayTimes");
      }
    },
    dayInNumber(day) {
      switch (day) {
        case "Monday":
          return 1;
        case "Tuesday":
          return 2;
        case "Wednesday":
          return 3;
        case "Thursday":
          return 4;
        case "Friday":
          return 5;
        case "Saturday":
          return 6;
        case "Sunday":
          return 0;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.week-day {
  &__container {
    display: flex;
  }

  &__label {
    margin-right: 40px;
  }

  &__time {
    margin-left: auto;
  }
}
</style>

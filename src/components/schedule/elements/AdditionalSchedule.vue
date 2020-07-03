<template>
  <div class="additional-schedule">
    <input
      type="date"
      @change="editDate"
      :disabled="edit"
      v-model="fieldDate"
    />
    <input
      type="time"
      @change="editStart"
      :disabled="edit"
      v-model="fieldStart"
    />
    <input type="time" @change="editEnd" :disabled="edit" v-model="fieldEnd" />
    <v-icon
      v-if="!edit"
      class="additional-schedule__delete-btn"
      @click="deleteElement"
    >
      fas fa-times
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "AdditionalSchedule",
  data: () => ({
    fieldDate: "",
    fieldStart: "",
    fieldEnd: ""
  }),
  props: {
    date: String,
    start: String,
    end: String,
    index: Number,
    additionalSchedule: Object,
    edit: Boolean
  },
  methods: {
    addAdditionalScheduleValue() {
      return this.$store.commit("setAdditionalScheduleValue", {
        date: this.date,
        start: this.start,
        end: this.end,
        index: this.index
      });
    },
    editDate(event) {
      this.date = event.target.value;
      this.addAdditionalScheduleValue();
    },
    editStart(event) {
      this.start = event.target.value;
      this.addAdditionalScheduleValue();
    },
    editEnd(event) {
      this.end = event.target.value;
      this.addAdditionalScheduleValue();
    },
    deleteElement() {
      this.$store.commit("deleteElementAdditionalSchedule", this.index);
    }
  },
  created() {
    if (
      !(
        this.$store.state.Schedule.additional_schedule[this.index] === undefined
      )
    ) {
      this.fieldDate = this.$store.state.Schedule.additional_schedule[
        this.index
      ].date;
      this.fieldStart = this.$store.state.Schedule.additional_schedule[
        this.index
      ].start;
      this.fieldEnd = this.$store.state.Schedule.additional_schedule[
        this.index
      ].end;
    }
  }
};
</script>

<style scoped lang="scss">
.additional-schedule {
  margin-top: 10px;

  &__delete-btn {
    color: red;
  }
}
</style>

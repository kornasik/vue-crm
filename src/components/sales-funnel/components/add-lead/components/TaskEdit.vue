<template>
  <div
    class="task-edit"
    v-if="
      isOpenModalForEditTask.flag &&
        isOpenModalForEditTask.number === numberTask
    "
  >
    <div class="task-edit__add-result">
      <b-input
        v-model="result"
        placeholder="Добавить результат"
        class="task-edit__add-result__input"
      />
      <b-button
        type="is-primary"
        class="task-edit__add-result__btn-complete"
        @click.native="taskComplete"
        >Выполнить</b-button
      >
    </div>
    <!-- <div :style="{ display: 'flex', alignItems: 'center', padding: '10px 30px' }">
      <b-tooltip
        label="Создать задачу после выполнения текущей"
        position="is-right"
      >
        <b-icon pack="fas" icon="question-circle" size="is-small"> </b-icon>
      </b-tooltip>
      <b-checkbox :style="{ margin: '0 0 0 15px' }" />
      <b-select placeholder="Small" size="is-small" v-model="staff[0]">
        <option :value="item" v-for="(item, index) in staff" :key="index">{{
          item
        }}</option>
      </b-select>
      <input
        type="text"
        v-model="currentDate"
        @click="isOpenDateTimePicker = true"
      />
      <input
        type="text"
        v-model="betweenTimeOnTask"
        @click="isOpenDateTimePicker = true"
      />
      <DateTimePicker
        :isOpenDateTimePicker="isOpenDateTimePicker"
        @emitCloseDateTimePicker="closeDateTimePicker"
        @emitChangeDate="changeDate"
        @emitChangeStartTime="changeStartTime"
        @emitChangeEndTime="changeEndTime"
      />
    </div>-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DateTimePicker from "@/components/sales-funnel/components/add-lead/components/DateTimePicker.vue";
@Component({
  props: {
    isOpenModalForEditTask: Object,
    numberTask: Number
  },
  components: {
    DateTimePicker
  }
})
export default class TaskEdit extends Vue {
  result: string = "";
  staff: any = [
    "Связаться",
    "Встреча",
    "Отправить информацию",
    "Зелёная матека",
    "Как прошло"
  ];
  isOpenDateTimePicker: boolean = false;
  date: any = new Date();
  startTime: string = "";
  endTime: string = "";
  user: string = "flint";
  taskAssignment: string = this.staff[0];
  numberTask: number | undefined;

  /*  closeDateTimePicker(flagForDateTimePicker: boolean) {
    this.isOpenDateTimePicker = flagForDateTimePicker;
  }

  changeDate(date: string) {
    this.date = date;
  }

  changeStartTime(time: any) {
    this.startTime = time;
  }

  changeEndTime(time: any) {
    this.endTime = time;
  }

  get currentDate() {
    let date: string =
      this.date.getDate() < 10
        ? "0" + this.date.getDate()
        : this.date.getDate();
    let month: string =
      this.date.getMonth() < 10
        ? "0" + String(Number(this.date.getMonth()) + 1)
        : String(Number(this.date.getMonth()) + 1);
    let year: string = this.date.getFullYear();

    return date + "." + month + "." + year;
  }

  get betweenTimeOnTask() {
    if (this.startTime && !this.endTime) {
      return (
        this.startTime.getHours() +
        ":" +
        this.startTime.getMinutes() +
        "-" +
        "00:00"
      );
    }
    if (this.endTime && !this.startTime) {
      return (
        "00:00" +
        " " +
        this.endTime.getHours() +
        ":" +
        this.endTime.getMinutes()
      );
    }

    if (this.startTime && this.endTime) {
      return (
        this.startTime.getHours() +
        ":" +
        this.startTime.getMinutes() +
        "-" +
        this.endTime.getHours() +
        ":" +
        this.endTime.getMinutes()
      );
    }
    return "Весь день";
  }*/

  taskComplete() {
    this.$emit("emitTaskComplete", {
      numberTask: this.numberTask,
      result: this.result
    });
  }
}
</script>

<style lang="scss" scoped>
.task-edit {
  padding: 10px 0;
  &__add-result {
    display: flex;
    &__input {
      width: 100%;
      padding: 0 25px;
    }
    &__btn-complete {
      margin-right: 15px;
    }
  }
}
</style>

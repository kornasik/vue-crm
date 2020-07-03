<template>
  <section>
    <div class="create-task-for-lead">
      <div :style="{ margin: 'auto 0' }">
        Задача на
      </div>
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
      <div :style="{ margin: 'auto 5px auto 0' }">для</div>
      <select v-model="user" :style="{ width: user.length * 10 + 'px' }">
        <optgroup label="Black Sails">
          <option value="flint">Flint</option>
          <option value="silver">Silver</option>
          <option value="vane">Vane</option>
          <option value="billy">Billy</option>
          <option value="jack">Jack</option>
        </optgroup>

        <optgroup label="Breaking Bad">
          <option value="heisenberg">Heisenberg</option>
          <option value="jesse">Jesse</option>
          <option value="saul">Saul</option>
          <option value="mike">Mike</option>
        </optgroup>

        <optgroup label="Game of Thrones">
          <option value="tyrion-lannister">Tyrion Lannister</option>
          <option value="jamie-lannister">Jamie Lannister</option>
          <option value="daenerys-targaryen">Daenerys Targaryen</option>
          <option value="jon-snow">Jon Snow</option>
        </optgroup>
      </select>
      <select
        v-model="taskAssignment"
        :style="{ width: taskAssignment.length * 10 + 'px' }"
      >
        <option v-for="employee in staff" :value="employee" :key="employee">
          {{ employee }}
        </option>
      </select>
      <span>:</span>
      <input
        type="text"
        v-model="description"
        :style="{
          width: '30%',
          border: 'none',
          outline: 'none',
          textAlign: 'left'
        }"
      />
    </div>
    <div class="create-task-for-lead__actions">
      <div class="create-task-for-lead__actions__buttons">
        <b-button type="is-primary" @click="createTask">Создать</b-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DateTimePicker from "@/components/sales-funnel/components/add-lead/components/DateTimePicker.vue";
@Component({
  components: {
    DateTimePicker
  }
})
export default class CreateTaskForLead extends Vue {
  staff: any = [
    "Связаться",
    "Встреча",
    "Отправить информацию",
    "Зелёная матека",
    "Как прошло"
  ];
  isOpenDateTimePicker: boolean = false;
  date: any = new Date();
  startTime: any = "";
  endTime: any = "";
  user: string = "flint";
  taskAssignment: string = this.staff[0];
  description: string = "";

  closeDateTimePicker(flagForDateTimePicker: boolean) {
    this.isOpenDateTimePicker = flagForDateTimePicker;
  }

  changeDate(date: Date) {
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
  }

  createTask() {
    this.$emit("emitCreateTask", {
      description: this.description,
      date: this.currentDate,
      user: this.user,
      taskAssignment: this.taskAssignment
    });
  }
}
</script>

<style lang="scss" scoped>
.create-task-for-lead {
  position: relative;
  display: flex;
  height: 25px;
  &__actions {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 95%;
    top: 70px;
    &__buttons {
      width: 215px;
      display: flex;
      justify-content: space-between;
    }
  }
}
input[type="text"] {
  margin: 0 5px;
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 85px;
}

select {
  margin: 0 5px;
  border-bottom: 1px solid #7ba9f6;
}
select:focus {
  outline: none;
  border-bottom: 1px solid #7ba9f6;
}

section {
  height: 115px;
}
</style>

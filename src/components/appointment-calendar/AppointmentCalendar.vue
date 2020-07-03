<template>
  <div class="appointment-calendar">
    <h1 class="appointment-calendar__title">
      {{ $t("appointmentCalendar.title") }}
    </h1>
    <Header />
    <Table />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/components/appointment-calendar/components/Header.vue";
import Table from "@/components/appointment-calendar/components/Table.vue";
import ModalToRecord from "@/components/appointment-calendar/components/ModalToRecord.vue";

@Component({
  components: {
    Header,
    Table,
    ModalToRecord
  }
})
export default class AppointmentCalendar extends Vue {}
</script>

<style lang="scss" scoped>
.appointment-calendar {
  margin: 0 auto;
  text-align: center;
  &__title {
    color: #069cfa;
    font-size: 30px;
    margin-bottom: 20px;
  }
}
</style>

<template>
  <div class="element-table">
    <b-button
      icon-pack="fas"
      :icon-left="IsSuccess ? 'check-circle' : 'circle-notch'"
      :type="IsSuccess ? 'is-success' : 'is-light'"
      @click.native="IsBar = !IsBar"
      >{{ item }}</b-button
    >
    <div class="element-table__schedule" v-if="IsBar">
      <div class="element-table__schedule__titles">
        <span>{{ $t("appointmentCalendar.titleColumnSchedulePatient") }}:</span>
        <span
          >{{ $t("appointmentCalendar.titleColumnScheduleProcedure") }}:</span
        >
      </div>
      <div
        class="element-table__schedule-item"
        v-for="(planDataItem, planDataIndex) in planData"
        :key="planDataIndex"
      >
        <span>{{ planDataItem.namePatient }}</span>
        <span>{{ planDataItem.nameProcedure }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { PlanDataItem } from "@/types/appointment-calendar";

@Component({
  props: {
    item: String
  }
})
export default class AppointmentTableElement extends Vue {
  IsSuccess: Boolean = false;
  IsBar: Boolean = false;

  planData: PlanDataItem[] = [
    {
      namePatient: "Jack Archebalt",
      nameProcedure: "Remove tooth"
    },
    {
      namePatient: "John Stink",
      nameProcedure: "Install seal"
    },
    {
      namePatient: "Shon Dool",
      nameProcedure: "Paradontities"
    }
  ];

  created() {
    this.planData.length > 0
      ? (this.IsSuccess = true)
      : (this.IsSuccess = false);
  }
}
</script>

<style lang="scss" scoped>
.element-table {
  position: relative;
  &__schedule {
    position: absolute;
    top: 45px;
    min-width: 250px;
    height: fit-content;
    border-radius: 5px;
    background-color: white;
    z-index: 900;
    overflow: visible;
    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.45);
    -moz-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.45);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35);
    &__titles {
      display: flex;
      justify-content: space-evenly;
      border-bottom: 1px solid lightgray;
    }
    &-item {
      display: flex;
    }
    &:hover {
      z-index: 901;
    }
    &::after {
      content: "";
      position: absolute; /* Абсолютное позиционирование */
      left: 20px;
      top: -18px; /* Положение треугольника */
      border: 9px solid transparent; /* Прозрачные границы */
      border-bottom: 10px solid white; /* Добавляем треугольник */
    }
    & span {
      width: 50%;
      text-align: center;
    }
  }
}
</style>

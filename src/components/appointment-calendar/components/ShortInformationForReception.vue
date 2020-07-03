<template>
  <div class="card-reception">
    <div
      :style="{ width: 'inherit' }"
      v-for="(itemListRecord, indexItemListRecord) in getViewListRecords"
      :key="indexItemListRecord"
      @mouseover="isActiveShortModal = true"
      @mouseout="isActiveShortModal = false"
    >
      <div
        :style="styleCardSchedule(itemListRecord)"
        v-if="
          doctors[doctorIndex] === itemListRecord.doctor &&
            String(arrDates[arrDatesCountIndex].day) ===
              String(itemListRecord.date.split('.')[0]) &&
            timeItem.split(':')[0] ===
              itemListRecord.timeReceptions.startReception.split(':')[0]
        "
      >
        <div class="card-reception__information">
          <div>{{ itemListRecord.nameClient }}</div>
          <div>
            {{ itemListRecord.timeReceptions.startReception }} -
            {{ itemListRecord.timeReceptions.endReception }}
          </div>
          <div
            v-if="isActiveShortModal"
            class="card-reception__information__short-information"
          >
            <span
              >{{ $t("appointmentCalendar.doctor") }}:
              {{ itemListRecord.doctor }}</span
            >
            <span
              >{{ $t("appointmentCalendar.client") }}:
              {{ itemListRecord.nameClient }}</span
            >
            <span
              >{{ $t("appointmentCalendar.date") }}:
              {{ itemListRecord.date }}</span
            >
            <span
              >{{ $t("appointmentCalendar.reception") }}:
              {{ itemListRecord.reception.reception }}</span
            >
            <span
              >{{ $t("appointmentCalendar.durationOfAdmission") }}:
              {{ itemListRecord.reception.durationReception }}
              {{ $t("appointmentCalendar.min") }}</span
            >
            <span
              >{{ $t("appointmentCalendar.timeReception") }}:
              {{ itemListRecord.timeReceptions.startReception }} -
              {{ itemListRecord.timeReceptions.endReception }}
            </span>
            <div
              class="card-reception__information__short-information__arrow-down "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Getter, Mutation } from "vuex-class";

@Component({
  props: {
    doctors: Array,
    doctorIndex: Number,
    arrDates: Array,
    arrDatesCountIndex: Number,
    timeItem: String
  }
})
export default class CardReception extends Vue {
  @Getter("getViewListRecords") getViewListRecords: any;

  isActiveShortModal: Boolean = false;

  getMilliseconds(hours: any, minutes: any) {
    return hours * 1000 * 60 * 60 + minutes * 1000 * 60;
  }

  stylesForCardsReception(
    hours: string,
    minutes: string,
    differenceTime: any,
    dataRecord: any,
    topPx: number
  ) {
    return {
      position: "absolute",
      width: "inherit",
      top:
        70 +
        0.666667 * (this.getMilliseconds(hours, minutes) / 1000 / 60) -
        topPx +
        "px",
      height: differenceTime * 0.66666667 + "30px",
      backgroundColor: dataRecord.color ? dataRecord.color : "gray",
      fontSize: "10px",
      maxWidth: "120px",
      color: "white"
    };
  }

  styleCardSchedule(dataRecord: any) {
    const hoursFirstTime = dataRecord.timeReceptions.startReception.split(
      ":"
    )[0];
    const minuteFirstTime = dataRecord.timeReceptions.startReception.split(
      ":"
    )[1];
    const hoursSecondTime = dataRecord.timeReceptions.endReception.split(
      ":"
    )[0];
    const minuteSecondTime = dataRecord.timeReceptions.endReception.split(
      ":"
    )[1];

    const differenceTime =
      (this.getMilliseconds(hoursSecondTime, minuteSecondTime) -
        this.getMilliseconds(hoursFirstTime, minuteFirstTime)) /
      1000 /
      60;

    if (Number(hoursFirstTime) > 6) {
      return this.stylesForCardsReception(
        hoursFirstTime,
        minuteFirstTime,
        differenceTime,
        dataRecord,
        310
      );
    }

    return this.stylesForCardsReception(
      hoursFirstTime,
      minuteFirstTime,
      differenceTime,
      dataRecord,
      690
    );
  }
}
</script>

<style lang="scss" scoped>
.card-reception {
  width: inherit;
  &__information {
    position: relative;
    &__short-information {
      position: absolute;
      width: 170px;
      height: 100px;
      background-color: black;
      display: inline-grid;
      bottom: 45px;
      border-radius: 10px;
      left: -25px;
      opacity: 0.8;
      text-align: left;
      &__arrow-down {
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 25px solid black;
        margin: 0 auto;
      }
    }
  }
}
</style>

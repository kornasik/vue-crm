<template>
  <div
    :style="{ position: 'relative', margin: '50px auto', maxWidth: '1300px' }"
  >
    <ModalToRecord
      :selectDate="selectDate"
      :selectTime="selectTime"
      @emitAddRecord="addRecord"
    />
    <div
      class="appointment-table"
      :style="calculateWidthTable"
      v-if="getSelectedDates.length > 0 && getSelectedDoctors.length > 0"
    >
      <div class="appointment-table__header">
        <div class="appointment-table__header__year">
          {{ new Date().getFullYear() }}
        </div>
        <div
          class="appointment-table__date-column"
          v-for="(dateItem, dateIndex) in arrDates"
          :key="dateIndex"
          :style="{ minWidth: 120 * doctors.length + 'px' }"
        >
          <div>
            {{ dateItem.day }}/{{ calculateNumberMonth(dateItem.month) }}
          </div>
          <div class="appointment-table__date-column__doctors-block">
            <div
              class="appointment-table__date-column__doctors-block__doctor"
              v-for="(doctor, indexDoctor) in doctors"
              :key="indexDoctor"
            >
              {{ doctor }}
            </div>
          </div>
        </div>
      </div>
      <div class="appointment-table__time">
        <div
          class="appointment-table__time__row"
          v-for="(timeItem, timeIndex) in times"
          :key="timeIndex"
        >
          <div class="appointment-table__time__row__time-element">
            {{ timeItem }}
          </div>
          <div
            class="appointment-table__time__row__data-element"
            :style="{ minWidth: 120 * doctors.length + 'px' }"
            v-for="(arrDatesCount, arrDatesCountIndex) in arrDates.length"
            :key="arrDatesCountIndex"
          >
            <div
              class="appointment-table__time__row__data-element__doctor-schedule"
              :data-year="arrDates[arrDatesCountIndex].year"
              :data-date="arrDates[arrDatesCountIndex].day"
              :data-month="arrDates[arrDatesCountIndex].month"
              :data-doctor="doctors[doctorIndex]"
              :style="[doctorIndex + 1 === doctors.length ? '' : borderRight]"
              v-for="(doctor, doctorIndex) in doctors.length"
              :key="doctorIndex"
              @click="newRecord"
            >
              <CardReception
                :doctors="doctors"
                :doctorIndex="doctorIndex"
                :arrDates="arrDates"
                :arrDatesCountIndex="arrDatesCountIndex"
                :timeItem="timeItem"
              />
            </div>
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
import ElementTable from "@/components/appointment-calendar/components/ElementTable.vue";
import ModalToRecord from "@/components/appointment-calendar/components/ModalToRecord.vue";
import { Watch } from "vue-property-decorator";
import CardReception from "@/components/appointment-calendar/components/ShortInformationForReception.vue";

@Component({
  components: {
    CardReception,
    ElementTable,
    ModalToRecord
  }
})
export default class AppointmentTable extends Vue {
  @Mutation("setIsModalToRecord") setIsModalToRecord: any;
  @Mutation("setListRecords") setListRecords: any;
  @Mutation("setViewListRecords") setViewListRecords: any;

  @Getter("getSelectedDates") getSelectedDates: any;
  @Getter("getListRecords") getListRecords: any;
  @Getter("getViewListRecords") getViewListRecords: any;
  @Getter("getSelectedDoctors") getSelectedDoctors: any;

  @Watch("getSelectedDates")
  checkEmptySelectDatesCalendar() {
    this.getSelectedDates.length > 0
      ? (this.isEmptyTable = false)
      : (this.isEmptyTable = true);
    this.drawingRecord();
  }

  @Watch("getListRecords")
  checkListRecords() {
    this.drawingRecord();
  }

  selectDatesCalendar: Object[] = [];
  isEmptyTable: Boolean = true;
  selectDate: any = new Date();
  selectTime: string = "";

  doctors: string[] = [];

  borderRight = {
    borderRight: "1px solid lightgray"
  };

  times: string[] = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00"
  ];

  created() {
    this.selectDatesCalendar.length > 0
      ? (this.isEmptyTable = true)
      : (this.isEmptyTable = false);
    this.drawingRecord();
  }

  get calculateWidthTable() {
    const widthTable =
      this.selectDatesCalendar.length * this.getSelectedDoctors.length * 120 +
      90;
    if (widthTable < 1000) {
      return {
        maxWidth: widthTable + "px"
      };
    }
    return {
      maxWidth: "1000px"
    };
  }

  get arrDates() {
    this.selectDatesCalendar = [];
    if (this.getSelectedDates.length > 0) {
      let days = [];
      this.$i18n.locale === "ru"
        ? (days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"])
        : (days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]);
      let firstSelectDate = Date.parse(this.getSelectedDates[0]);
      let secondSelectDate = Date.parse(this.getSelectedDates[1]);
      do {
        this.selectDatesCalendar.push({
          day: new Date(firstSelectDate).getDate(),
          dayWeek: days[new Date(firstSelectDate).getDay()],
          month: new Date(firstSelectDate).getMonth() + 1,
          year: new Date(firstSelectDate).getFullYear()
        });
        firstSelectDate = firstSelectDate + 86400000;
      } while (firstSelectDate <= secondSelectDate);
      this.doctors = this.getSelectedDoctors;
      return this.selectDatesCalendar;
    }
    return [];
  }

  calculateNumberMonth(month: number) {
    return month < 10 ? "0" + month : month;
  }

  newRecord(event: any) {
    this.setIsModalToRecord();
    this.selectDate = new Date(
      event.target.dataset.year +
        "-" +
        event.target.dataset.month +
        "-" +
        event.target.dataset.date
    );
    this.selectTime =
      event.target.parentElement.parentElement.childNodes[0].innerText;
  }

  drawingRecord() {
    let temp = [...this.getListRecords];
    temp.map((record: any) => {
      if (
        Number(record.date.split(".")[1]) ===
        this.getSelectedDates[0].getMonth() + 1
      ) {
        if (
          this.doctors.includes(record.doctor) &&
          Number(record.date.split(".")[0]) >=
            this.getSelectedDates[0].getDay() &&
          Number(record.date.split(".")[1]) <= this.getSelectedDates[0].getDay()
        ) {
          return record;
        }
      }
    });
    this.setViewListRecords(temp);
  }

  addRecord(dataToRecord: any) {
    dataToRecord.arraySelectedDoctors.forEach((doctor: string) => {
      let listRecords = this.getListRecords;
      listRecords.push({
        doctor: doctor,
        nameClient: dataToRecord.nameClient,
        date:
          new Date(this.selectDate).getDate() +
          "." +
          new Date(this.selectDate).getMonth() +
          1 +
          "." +
          new Date(this.selectDate).getFullYear(),
        reception: { ...dataToRecord.selectReceptions[doctor] },
        timeReceptions: { ...dataToRecord.timeReception[doctor] },
        color: dataToRecord.selectedColor
      });
      this.setListRecords(listRecords);
    });
  }
}
</script>

<style lang="scss" scoped>
.appointment-table {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: overlay;
  min-height: 720px;
  min-width: fit-content;
  margin: 0 auto;

  &__header {
    display: flex;
    position: absolute;
    border: 1px solid lightgray;
    height: 40px;

    &__year {
      margin: 0 20px;
      height: 40px;
      min-width: 40px;
    }
  }

  &__time {
    display: flex;
    position: absolute;
    top: 40px;
    flex-direction: column;
    height: 500px;

    &__row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 40px;
      border-bottom: 1px solid lightgray;
      border-left: 1px solid lightgray;

      &__time-element {
        min-width: 81px;
        height: 40px;
        border-right: 1px solid lightgray;
      }

      &__data-element {
        height: 40px;
        border-right: 1px solid lightgray;
        display: flex;

        &__doctor-schedule {
          width: 120px;
          height: 40px;
        }

        &__doctor-schedule:hover {
          background-color: lightgray;
        }

        &__doctor-schedule:active {
          background-color: lightgray;
          opacity: 0.6;
        }
      }
    }
  }

  &__date-column {
    display: block;
    text-align: center;
    min-width: 120px;
    border-left: 1px solid lightgray;

    &__doctors-block {
      display: flex;
      font-size: 10px;

      &__doctor {
        width: 120px;
        border-top: 1px solid lightgray;
        margin-top: -1px;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;

  &-button {
    background-color: #666;
  }

  &-track {
    background-color: #999;
  }

  &-track-piece {
    background-color: #ffffff;
  }

  &-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }

  &-corner {
    background-color: #999;
  }
}

::-webkit-resizer {
  background-color: #666;
}
</style>

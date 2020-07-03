<template>
  <div class="select-time-reception-doctor">
    <h2>
      <strong>{{ nameDoctor }}</strong
      >&nbsp;
      <span>{{ selectReceptions[nameDoctor].reception }}</span>
    </h2>
    <div class="select-time-reception-doctor__time-record">
      <h1>{{ $t("appointmentCalendar.durationOfAdmission") }}</h1>
      <b-field>
        <b-numberinput
          v-model="durationReception"
          icon-pack="fas"
          controls-rounded
          :min="0"
          :step="15"
        />
      </b-field>
      <h1>{{ $t("appointmentCalendar.selectTimeToRecord") }}</h1>
      <b-field>
        <b-select
          v-model="selectedTimeReception"
          placeholder="$t('appointmentCalendar.selectTime')"
          expanded
        >
          <option
            v-for="(time, timeIndex) in timeReceptions"
            :value="time"
            :key="timeIndex"
          >
            {{ time.startReception }} - {{ time.endReception }}
          </option>
        </b-select>
      </b-field>
    </div>
    <h1>Цвет записи</h1>
    <div class="select-time-reception-doctor__colors">
      <div v-for="(color, indexColor) in colors" :key="indexColor">
        <b-tooltip :label="color" type="is-black">
          <div
            class="select-time-reception-doctor__colors__color"
            :class="[selectedColor === color ? 'active' : '']"
            :style="{ backgroundColor: color }"
            :id="color"
            @click="selectColor"
          ></div
        ></b-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({
  props: {
    nameDoctor: String,
    selectReceptions: Object,
    selectTime: String
  }
})
export default class SelectTimeReceptionDoctor extends Vue {
  nameDoctor: string | undefined;
  selectTime: string | undefined | any;
  durationReception: number = 45;
  selectedColor: string = "";
  timeReceptions: any = [];
  selectedTimeReception: string = "";
  @Watch("durationReception")
  editDurationReception() {
    this.$emit("emitDurationReception", {
      nameDoctor: this.nameDoctor,
      durationReception: this.durationReception
    });
    this.generateListTime();
  }

  @Watch("selectedTimeReception")
  chaneValueTimeReception() {
    this.$emit("emitSelectedTimeReception", {
      nameDoctor: this.nameDoctor,
      timeReception: this.selectedTimeReception
    });
  }

  colors: string[] = [
    "red",
    "blue",
    "purple",
    "black",
    "green",
    "gray",
    "pink"
  ];

  created() {
    this.generateListTime();
  }

  generateListTime() {
    this.timeReceptions = [];
    const amountTimeRanges = 6;
    let fifteenMinuteInMillisecond: number = 900000;
    let durationReceptionInMillisecond: number =
      this.durationReception * 1000 * 60;
    let arraySelectDate: string[] | any = this.selectTime.split(":");
    let hourSelectDateInMilliseconds: number =
      arraySelectDate[0] * 1000 * 60 * 60;
    let minuteSelectDateInMilliseconds: number = arraySelectDate[1] * 1000 * 60;
    let selectDateMilliseconds =
      hourSelectDateInMilliseconds + minuteSelectDateInMilliseconds;
    let startTime = selectDateMilliseconds - 2 * fifteenMinuteInMillisecond;
    let endTime = selectDateMilliseconds + 4 * fifteenMinuteInMillisecond;
    for (let i = startTime; i < endTime; i = i + fifteenMinuteInMillisecond) {
      this.timeReceptions.push({
        startReception: this.msToTime(i).split(".")[0],
        endReception: this.msToTime(i + durationReceptionInMillisecond).split(
          "."
        )[0]
      });
      if (i === i + fifteenMinuteInMillisecond * amountTimeRanges) {
        return null;
      }
    }
    this.selectedTimeReception = this.timeReceptions[0];
  }

  msToTime(duration: number) {
    let milliseconds = parseInt(((duration % 1000) / 100) as any),
      seconds: any = Math.floor((duration / 1000) % 60),
      minutes: any = Math.floor((duration / (1000 * 60)) % 60),
      hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  selectColor(event: any) {
    this.selectedColor = event.target.id;
    this.$emit("emitSelectColor", this.selectedColor);
  }
}
</script>

<style lang="scss" scoped>
.select-time-reception-doctor {
  margin: 10px 0 40px 0;
  h1 {
    text-align: left;
    margin: 10px 0;
  }
  h2 {
    width: 100%;
    border-bottom: 1px solid lightgray;
    text-align: left;
    span {
      font-size: 12px;
    }
  }
  &__colors {
    display: flex;
    &__color {
      width: 25px;
      height: 25px;
      border-radius: 1000px;
      margin: 5px;
      border: 2px solid lightgray;
      &:hover {
        border: 2px solid gray;
        cursor: pointer;
      }
    }
  }
}

.active {
  border: 2px solid gray;
}
</style>

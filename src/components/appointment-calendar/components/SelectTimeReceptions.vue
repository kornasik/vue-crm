<template>
  <div class="select-time-receptions">
    <div class="select-time-receptions__actions">
      <div v-for="(nameDoctor, indexDoctor) in doctors" :key="indexDoctor">
        <SelectTimeReceptionDoctor
          :nameDoctor="nameDoctor"
          :selectReceptions="selectReceptions"
          :selectTime="selectTime"
          @emitDurationReception="editDurationReception"
          @emitSelectColor="changeSelectedColor"
          @emitSelectedTimeReception="changeTimeReception"
        />
      </div>
      <br />
    </div>
    <div class="select-time-receptions__help">
      <div class="select-time-receptions__help__select-client">
        <span
          >{{ $t("appointmentCalendar.client") }}:
          <strong>{{ nameClient }}</strong></span
        >
      </div>
      <div class="select-time-receptions__help__work">
        <h2>{{ $t("appointmentCalendar.freeInformation") }}</h2>
        <div class="select-time-receptions__help__work__day">
          {{ $t("appointmentCalendar.recordOn") }}
          {{
            new Date(selectDate).getDate() +
              "." +
              new Date(selectDate).getMonth() +
              1 +
              "." +
              new Date(selectDate).getFullYear()
          }}<br />
          {{ $t("appointmentCalendar.typeVisit") }}: {{ typeVisit }}
        </div>
        <div
          class="select-time-receptions__help__work__doctor"
          v-for="(nameDoctor, doctorIndex) in doctors"
          :key="doctorIndex"
        >
          <span
            class="select-time-receptions__help__work__doctor__name-doctor"
            >{{ nameDoctor }}</span
          ><br />
          <span
            >{{ $t("appointmentCalendar.reception") }}:
            {{ selectReceptions[nameDoctor].reception }}</span
          ><br />
          <span
            >{{ $t("appointmentCalendar.duration") }}:
            {{ selectReceptions[nameDoctor].durationReception }}
            {{ $t("appointmentCalendar.min") }}.</span
          ><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Multiselect from "vue-multiselect";
import SelectTimeReceptionDoctor from "@/components/appointment-calendar/components/SelectTimeReceptionDoctor.vue";
import { ISelectTypeReception } from "@/types/appointment-calendar";
@Component({
  components: {
    Multiselect,
    SelectTimeReceptionDoctor
  },
  props: {
    doctors: Array,
    nameClient: String,
    selectReceptions: Object,
    typeVisit: {
      type: String,
      default: "Обычный"
    },
    dateRecord: Date,
    selectDate: Date,
    selectTime: String
  }
})
export default class SelectTimeReceptions extends Vue {
  editDurationReception(durationReception: object) {
    this.$emit("emitDurationReception", durationReception);
  }

  selectTypeReception(payload: ISelectTypeReception) {
    this.$emit("emitSelectTypeReception", payload);
  }

  changeSelectedColor(color: string) {
    this.$emit("emitSelectColor", color);
  }

  changeTimeReception(timeReception: object) {
    this.$emit("emitSelectedTimeReception", timeReception);
  }
}
</script>

<style lang="scss" scoped>
.select-time-receptions {
  display: flex;
  &__actions {
    width: 50%;
    max-height: 350px;
    overflow: overlay;
    padding: 0 10px;
  }

  &__help {
    width: 50%;
    height: fit-content;
    padding: 10px;
    margin: 0 20px 0 20px;
    text-align: left;

    &__select-client {
      width: 100%;
      border-bottom: 1px solid lightgray;
      margin-bottom: 20px;
      padding-bottom: 20px;
    }
    &__work {
      h2 {
        margin-bottom: 4px;
      }
      &__doctor {
        padding: 10px;
        border-left: 1px solid #714dd2;
        border-bottom: 1px solid #714dd2;
        border-right: 1px solid #714dd2;

        &__name-doctor {
          font-size: 22px;
        }

        &__work-time {
          font-size: 14px;
        }
      }
      &__day {
        border-radius: 3px 3px 0 0;
        border: 1px solid #714dd2;
        background-color: #714dd2;
        color: white;
        border-bottom: none;
        width: 100%;
        padding: 5px;
      }
    }
  }
}

h2 {
  text-align: left;
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  &-button {
    background-color: #714dd2;
  }
  &-track {
    background-color: #999;
  }
  &-track-piece {
    background-color: #ffffff;
  }
  &-thumb {
    height: 50px;
    background-color: #714dd2;
    border-radius: 3px;
  }
  &-corner {
    background-color: #999;
  }
}

::-webkit-resizer {
  background-color: #714dd2;
}
</style>

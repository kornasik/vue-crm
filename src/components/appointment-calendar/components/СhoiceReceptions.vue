<template>
  <div class="choice-receptions">
    <div class="choice-receptions__actions">
      <div v-for="(nameDoctor, indexDoctor) in doctors" :key="indexDoctor">
        <ChoiceReceptionsDoctor
          :nameDoctor="nameDoctor"
          @emitSelectTypeReception="selectTypeReception"
        />
      </div>
      <br />
    </div>
    <div class="choice-receptions__help">
      <div class="choice-receptions__help__select-client">
        <span
          >{{ $t("appointmentCalendar.client") }}:
          <strong>{{ nameClient }}</strong></span
        >
      </div>
      <div class="choice-receptions__help__work">
        <h2>{{ $t("appointmentCalendar.freeInformation") }}</h2>
        <div class="choice-receptions__help__work__day">
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
          class="choice-receptions__help__work__doctor"
          v-for="(doc, docIndex) in doctors"
          :key="docIndex"
        >
          <span class="choice-receptions__help__work__doctor__name-doctor">{{
            doc
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Multiselect from "vue-multiselect";
import ChoiceReceptionsDoctor from "@/components/appointment-calendar/components/ChoiceReceptionsDoctor.vue";
import { ISelectTypeReception } from "@/types/appointment-calendar";
@Component({
  components: {
    Multiselect,
    ChoiceReceptionsDoctor
  },
  props: {
    doctors: Array,
    nameClient: String,
    typeVisit: {
      type: String,
      default: "Обычный"
    },
    dateRecord: Date,
    selectDate: Date
  }
})
export default class ChoiceReceptions extends Vue {
  selectTypeReception(payload: ISelectTypeReception) {
    this.$emit("emitSelectTypeReception", payload);
  }
}
</script>

<style lang="scss" scoped>
.choice-receptions {
  display: flex;
  &__actions {
    max-height: 350px;
    overflow: overlay;
    padding: 0 20px;
    width: 50%;
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
          font-size: 18px;
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
</style>

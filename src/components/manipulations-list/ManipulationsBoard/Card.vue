<template>
  <div
    class="card"
    :ref="`asd${manipulation.id}`"
    :data-id="manipulation.id"
    :class="{
      draggable: isDraggable,
      card_info: !manipulation.appointment,
      card_warning: manipulation.appointment
        ? isStatusPlanned(manipulation.appointment.completion_status)
        : false,
      card_success: manipulation.appointment
        ? isStatusFinished(manipulation.appointment.completion_status)
        : false,
      card_danger: manipulation.appointment
        ? isStatusClosed(manipulation.appointment.completion_status)
        : false
    }"
  >
    <!-- <h3 class="card__name">{{ manipulation. }}</h3> -->

    <p class="card__doctor">
      <!-- ВРАЧ: {{ manipulation.appointment.doctor.name }} -->
    </p>
    <p class="card__teeth">
      ЗУБ:
      <template v-if="manipulation.appointment">
        {{ getTeeth() }}
      </template>
    </p>
    <p class="card__sum">ИТОГО ЗА ПРИЕМ:</p>
    <p class="card__payment-state">
      СТАТУС ОПЛАТЫ:
      <template v-if="manipulation.appointment">
        {{ manipulation.appointment.payment_state }}
      </template>
    </p>
    <p class="card__duration">ДЛИТЕЛЬНОСТЬ:</p>
    <p class="card__visitTime">ЗАПИСЬ:</p>
    <o-button v-if="isAllowOpenAppointment" @click="emitOpenAppointment"
      >Провести приём</o-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import Appointment from "@/shared/classes/appointment.model";
import OButton from "@/components/shared/OButton/OButton.vue";
import Manipulation from "@/shared/classes/manipulation";
import { STATUS_TYPES } from "@/shared/enums/appointmentsStatusTypes";
import AppointmentRecord from "@/shared/classes/AppointmentRecord.class";
@Component({
  name: "appointments-board",
  components: {
    OButton
  }
})
export default class ManipulationCard extends Vue {
  @Prop({ default: () => null }) manipulation!: Manipulation;
  @Prop({ default: () => true }) isDraggable!: boolean;
  @Prop({ default: () => false }) isAllowOpenAppointment!: boolean;

  @Emit("openAppointment") emitOpenAppointment() {
    return this.manipulation.id;
  }

  getTeeth() {
    if (this.manipulation.appointment) {
      const records = this.manipulation.appointment.records;
      if (records && records.length) {
        if (records[0].teeth_list && records[0].teeth_list.length) {
          return records[0].teeth_list.join("; ");
        }
      }
    }
    return "-";
  }

  isStatusClosed(status: string) {
    if (status) {
      return status === STATUS_TYPES.CLOSED;
    }
    return false;
  }

  isStatusPlanned(status: string) {
    if (status) {
      return status === STATUS_TYPES.PLANNED;
    }
    return false;
  }

  isStatusFinished(status: string) {
    if (status) {
      return status === STATUS_TYPES.FINISHED;
    }
    return false;
  }
}
</script>
<style lang="scss" scoped>
$text_color_gray: #a2a2a2;
.card {
  background-color: #fff;
  padding: 10px;
  width: 100%;
  box-shadow: 2px 2px 2px rgba(10, 10, 10, 0.1);
  transition: 0.2s ease-in-out;
}

.card:hover {
  box-shadow: 11px 9px 2px rgba(10, 10, 10, 0.1);
}

.draggable {
  cursor: move;
}

p {
  margin: 0;
  padding: 0;
}

.card__name {
  font-weight: 4 00;
  font-size: 1.1rem;
}

.card__doctor {
  text-align: left;
  color: $text_color_gray;
}
.card__teeth {
  text-align: left;
  color: $text_color_gray;
}

.card__sum {
  text-align: left;
  color: $text_color_gray;
}

.card__currency {
  text-align: right;
  color: $text_color_gray;
}

.card__payment-state {
  text-align: right;
  color: $text_color_gray;
}

.card__duration {
  text-align: right;
  color: $text_color_gray;
}

.card__visitTime {
  text-align: right;
  color: $text_color_gray;
}

.card_info {
  background-color: #e5f0ff;
}
.card_warning {
  background-color: #fffcbb;
}
.card_success {
  background-color: #b5fbdd;
}
.card_danger {
  background-color: #fbceb5;
}
</style>

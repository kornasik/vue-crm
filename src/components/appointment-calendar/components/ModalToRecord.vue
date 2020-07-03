<template>
  <section
    :class="[
      getIsModalToRecord ? 'active-modal-record' : 'not-active-modal-record'
    ]"
    class="modal-to-record"
  >
    <b-icon pack="fas" icon="times" size="is-small" @click.native="closeModal">
    </b-icon>
    <b-steps
      size="is-small"
      v-model="activeStep"
      icon-pack="fas"
      icon-next="arrow-right"
      icon-prev="arrow-left"
    >
      <template v-for="(step, index) in baseSteps">
        <b-step-item v-if="step.displayed" :key="index" :label="step.label">
          <div v-if="activeStep === 0">
            <SelectClientAndDate
              @emitNameClient="selectNameClient"
              @emitDateRecord="selectDateRecord"
              :selectDate="selectDate"
            />
          </div>
          <div v-if="activeStep === 1">
            <CustomerInformation
              :nameClient="nameClient"
              :dateRecord="dateRecord"
              :selectDate="selectDate"
            />
          </div>
          <div v-if="activeStep === 2">
            <SelectDoctor
              :nameClient="nameClient"
              :selectDate="selectDate"
              @emitSelectedDoctors="selectedDoctors"
              @emitTypeVisit="changeTypeVisit"
            />
          </div>
          <div v-if="activeStep === 3">
            <ChoiceReceptions
              @emitSelectTypeReception="selectTypeReception"
              :doctors="arraySelectedDoctors"
              :nameClient="nameClient"
              :typeVisit="typeVisit"
              :dateRecord="dateRecord"
              :selectDate="selectDate"
            />
          </div>
          <div v-if="activeStep === 4">
            <SelectTimeReceptions
              :doctors="arraySelectedDoctors"
              :nameClient="nameClient"
              :typeVisit="typeVisit"
              :dateRecord="dateRecord"
              :selectReceptions="selectReceptions"
              :selectDate="selectDate"
              :selectTime="selectTime"
              @emitSelectColor="changeSelectedColor"
              @emitDurationReception="changeDurationReception"
              @emitSelectedTimeReception="changeTimeReception"
            />
          </div>
          <div v-if="activeStep === 5">
            <Complete
              :doctors="arraySelectedDoctors"
              :nameClient="nameClient"
              :typeVisit="typeVisit"
              :dateRecord="dateRecord"
              :selectReceptions="selectReceptions"
              :selectDate="selectDate"
              :timeReception="timeReception"
              @emitAddRecord="addRecord"
            />
          </div>
        </b-step-item>
      </template>
    </b-steps>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation } from "vuex-class";
import SelectClientAndDate from "@/components/appointment-calendar/components/SelectClientAndDate.vue";
import CustomerInformation from "@/components/appointment-calendar/components/CustomerInformation.vue";
import SelectDoctor from "@/components/appointment-calendar/components/SelectDoctor.vue";
import ChoiceReceptions from "@/components/appointment-calendar/components/СhoiceReceptions.vue";
import SelectTimeReceptions from "@/components/appointment-calendar/components/SelectTimeReceptions.vue";
import Complete from "@/components/appointment-calendar/components/Complete.vue";
import { ISelectTypeReception } from "@/types/appointment-calendar";
import { Emit } from 'vue-property-decorator';
@Component({
  components: {
    SelectClientAndDate,
    CustomerInformation,
    SelectDoctor,
    ChoiceReceptions,
    SelectTimeReceptions,
    Complete
  },
  props: {
    selectDate: {
      type: Date,
      default: () => new Date()
    },
    stepModal: Number,
    selectTime: String
  }
})
export default class ModalToRecord extends Vue {
  @Mutation("setIsModalToRecord") setIsModalToRecord: any;
  @Mutation("setListRecords") setListRecords: any;

  @Getter("getIsModalToRecord") getIsModalToRecord: any;
  @Getter("getListRecords") getListRecords: any;

  selectDate: string | undefined | any;
  activeStep: number = 0;
  nameClient: string = "";
  dateRecord: string | object = new Date();
  arraySelectedDoctors: string[] = [];
  typeVisit: string = "Обычный";
  selectReceptions: any = {};
  selectedColor: string = "";
  timeReception: object | any = {};

  get baseSteps() {
    return [
      {
        label: this.$t("appointmentCalendar.selectClientAndDate"),
        displayed: true
      },
      {
        label: this.$t("appointmentCalendar.subscribeToCustomer"),
        displayed: true
      },
      {
        label: this.$t("appointmentCalendar.selectDoctor"),
        displayed: true
      },
      {
        label: this.$t("appointmentCalendar.selectReception"),
        displayed: true
      },
      {
        label: this.$t("appointmentCalendar.selectTime"),
        displayed: true
      },
      {
        label: this.$t("appointmentCalendar.complete"),
        displayed: true
      }
    ];
  }

  closeModal() {
    this.setIsModalToRecord();
  }

  selectNameClient(nameClient: string) {
    this.nameClient = nameClient;
  }

  selectDateRecord(dateRecord: string) {
    this.dateRecord = dateRecord;
  }

  selectedDoctors(doctors: string[]) {
    this.arraySelectedDoctors = doctors;
  }

  changeTypeVisit(typeVisit: string) {
    this.typeVisit = typeVisit;
  }

  selectTypeReception(doctorAndTypeReception: ISelectTypeReception) {
    const defaultTimeReception = 45;

    this.selectReceptions[doctorAndTypeReception.nameDoctor] = {};
    this.selectReceptions[doctorAndTypeReception.nameDoctor].reception =
      doctorAndTypeReception.typeReception;
    this.selectReceptions[
      doctorAndTypeReception.nameDoctor
    ].durationReception = defaultTimeReception;
  }

  changeDurationReception(durationReception: any) {
    this.selectReceptions[durationReception.nameDoctor].durationReception =
      durationReception.durationReception;
    this.selectReceptions = { ...this.selectReceptions };
  }

  changeSelectedColor(color: string) {
    this.selectedColor = color;
  }

  changeTimeReception(timeReception: any) {
    this.timeReception[timeReception.nameDoctor] = {
      ...timeReception.timeReception
    };
  }

  addRecord() {
    this.$emit("emitAddRecord", {
      arraySelectedDoctors: this.arraySelectedDoctors,
      nameClient: this.nameClient,
      selectReceptions: this.selectReceptions,
      timeReception: this.timeReception,
      selectedColor: this.selectedColor
    });
    this.setIsModalToRecord();
    this.activeStep = 0;
  }
}
</script>

<style lang="scss" scoped>
.modal-to-record {
  z-index: 999;
  width: 80%;
  background-color: white;
  height: fit-content;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
}

.not-active-modal-record {
  position: absolute;
  left: 200%;
  top: 70px;
  transition: all 0.6s ease;
}
.active-modal-record {
  position: absolute;
  left: 140px;
  top: 70px;
  transition: all 0.4s ease;
}
</style>

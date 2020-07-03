<template>
  <div class="wrapper">
    <AppFilter
      v-if="!isLoading"
      v-model="filter"
      @filterChange="handleFilterChange"
    />
    <div class="main-wrapper">
      <div class="bar">
        <h3 class="bar__label">Планы лечения:</h3>
        <router-link
          :to="`/patients/${this.$route.params.id}/add-treatment-plan`"
          ><o-button>Добавить план</o-button></router-link
        >
      </div>
      <PlansMenu
        v-model="selectedPlanIndex"
        :plans="plans"
        @tabChange="handleTabChange"
      >
        <Board
          v-if="!isLoading"
          class="board-wrapper"
          :manipulations="mergedManipulations"
          :isUnplannedAppointmentsActive="selectedPlanIndex === 0"
          @openAppointment="handleOpenAppointment"
        />
      </PlansMenu>
    </div>
    <ModalToRecord @emitAddRecord="handleAddRecord" />
    <o-loading :isShow="isLoading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation, Action } from "vuex-class";
import MultiselectValue from "@/shared/classes/multiselect/multiselect-value.model";

import AppFilter from "@/components/manipulations-list/Filter.vue";
import Board from "@/components/manipulations-list/ManipulationsBoard/Board.vue";
import OLoading from "@/components/shared/OLoading.vue";
import OButton from "@/components/shared/OButton/OButton.vue";
import ModalToRecord from "@/components/appointment-calendar/components/ModalToRecord.vue";
import PlansMenu from "@/components/manipulations-list/PlansMenu.vue";

import Appointment from "@/shared/classes/appointment.model";
import ManipulationsFilter from "@/shared/classes/manipulations-filter.class";
import Plan from "@/shared/classes/plan.model";
import Manipulation from "@/shared/classes/manipulation";
import AppointmentRecord from "@/shared/classes/AppointmentRecord.class";

@Component({
  components: {
    AppFilter,
    OLoading,
    OButton,
    ModalToRecord,
    Board,
    PlansMenu
    // StatusList
  },
  name: "treatment-plans"
})
export default class TreatmentPlans extends Vue {
  @Action("appointments/getAppointmentsByPatientId")
  getAppointmentsByPatientId: any;
  @Action("appointments/createAppointment") createAppointment: any;
  @Action("plan/getPlansByPatientId") getPlansByPatientId: any;

  @Mutation("setIsModalToRecord") setIsModalToRecord: any;

  @Getter("appointments/list") appointments!: Appointment[];
  @Getter("plan/plans") plans!: Plan[];

  mergedManipulations: any[] = [];
  manipulations: Manipulation[] = [];
  filter: ManipulationsFilter = new ManipulationsFilter();
  isLoading = true;
  selectedPlanIndex = 0;

  created() {
    this.init();
  }

  async init() {
    const patientId = +this.$route.params.id;
    await Promise.all([
      this.getPlansByPatientId(patientId),
      this.getAppointmentsByPatientId(patientId)
    ]);
    const selectedPlan = this.plans[0];
    this.manipulations = selectedPlan.manipulations.reverse();
    const selectedPlanAppointments: Appointment[] = this.appointments.filter(
      this.filterAppointmentByPlanId(selectedPlan.id)
    );
    let mergedManipulations: Manipulation[] = [];
    if (selectedPlan.id === 0) {
      mergedManipulations = Manipulation.createManipulationsForAppointments(
        selectedPlanAppointments
      );
    } else {
      this.mergedManipulations = Manipulation.getMergedManipulations(
        this.manipulations,
        selectedPlanAppointments
      );
    }
    this.setFilterValuesByManipulations(this.mergedManipulations);
    this.filter.getFilterValuesFromUrl(this.$route.query);
    this.selectPlanByIndex(0);
    this.isLoading = false;
  }

  openAddAppointment() {
    this.setIsModalToRecord();
  }

  handleOpenAppointment(id: number) {
    debugger;
  }

  setFilterValuesByManipulations(manipulations: Manipulation[]) {
    this.filter.reset();
    // eslint-disable-next-line prettier/prettier
    this.filter = ManipulationsFilter.getValuesFromManipulations(manipulations);
  }

  handleFilterChange() {
    this.setFiltersToUrl();
  }

  setFiltersToUrl() {
    const urlParams = ManipulationsFilter.getSelectedFilterValues(this.filter);
    this.$router.replace({ query: urlParams });
  }

  handleAddRecord(appointment: any) {
    // debugger;
  }

  handleTabChange(tabIndex: number) {
    this.selectPlanByIndex(tabIndex);
  }

  selectPlanByIndex(tabIndex: number) {
    const selectedPlanId = this.plans[tabIndex].id;
    this.manipulations = this.plans[tabIndex].manipulations.reverse();
    const selectedPlanAppointments: Appointment[] = this.appointments.filter(
      this.filterAppointmentByPlanId(selectedPlanId)
    );
    let mergedManipulations: Manipulation[] = [];
    if (selectedPlanId === 0) {
      mergedManipulations = Manipulation.createManipulationsForAppointments(
        selectedPlanAppointments
      );
    } else {
      this.mergedManipulations = Manipulation.getMergedManipulations(
        this.manipulations,
        selectedPlanAppointments
      );
    }
    this.setFilterValuesByManipulations(this.mergedManipulations);
    this.mergedManipulations = Manipulation.getFilteredManipulations(
      this.mergedManipulations,
      this.filter
    );
  }

  filterAppointmentByPlanId(planId: number) {
    return function(appointment: Appointment) {
      // planId === 0 -> внеплановые приёмы
      if (planId === 0) {
        return appointment.plan_id === null;
      }
      return appointment.plan_id === planId;
    };
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}

.main-wrapper {
  padding: 10px;
}
.bar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #cfcfcf;
}

.board-wrapper {
  padding-top: 10px;
}

.bar__label {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  font-weight: 300;
}
a {
  text-decoration: none;
}
</style>

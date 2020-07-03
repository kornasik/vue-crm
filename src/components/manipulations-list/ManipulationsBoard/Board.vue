<template>
  <div class="board">
    <template v-if="manipulations.length">
      <Column
        label="Все"
        dragName="status"
        :manipulations="manipulations"
        :isDraggable="false"
        @openAppointment="emitopenAppointment"
      />
      <!-- TODO: disable drag to this area -->
      <!-- props: canDragTo canDragFrom -->
      <Column
        label="Не внесенные в расписание"
        dragName="status"
        :manipulations="notPlannedManipulations"
        :type="statusTypes.NOT_PLANNED"
        @moveCard="handleMoveCard"
        @openAppointment="emitopenAppointment"
      />
      <Column
        label="Внесенные в расписание"
        dragName="status"
        :manipulations="plannedManipulations"
        :type="statusTypes.PLANNED"
        :isAllowOpenAppointment="true"
        @moveCard="handleMoveCard"
        @openAppointment="emitopenAppointment"
      />
      <Column
        label="Завершенные"
        dragName="status"
        :manipulations="finishedManipulations"
        :type="statusTypes.FINISHED"
        @moveCard="handleMoveCard"
        @openAppointment="emitopenAppointment"
      />
      <Column
        label="Закрытые"
        dragName="status"
        :manipulations="closedManipulations"
        :type="statusTypes.CLOSED"
        @moveCard="handleMoveCard"
        @openAppointment="emitopenAppointment"
      />
    </template>
    <template v-else>
      <h3 v-if="!isUnplannedAppointmentsActive">
        Нет добавленных манипуляций. Для добавления нажмите кнопку
        "Редактировать план"
      </h3>
      <h3 v-else>
        Нет добавленных приёмов. Для добавления нажмите кнопку "Добавить приём"
      </h3>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import OInput from "@/components/shared/OInput/OInput.vue";
import Component from "vue-class-component";
import ManipulationsFilter from "@/shared/classes/manipulations-filter.class";
import { Getter, Mutation, Action } from "vuex-class";
import { Prop, Watch, Emit } from "vue-property-decorator";
import Multiselect from "vue-multiselect";
import Appointment from "@/shared/classes/appointment.model";
import Column from "@/components/manipulations-list/ManipulationsBoard/Column.vue";
import Manipulation from "@/shared/classes/manipulation";
import { STATUS_TYPES } from "@/shared/enums/appointmentsStatusTypes";

@Component({
  components: {
    Column,
    Multiselect,
    OInput
  },
  name: "manipulations-board"
})
export default class TreatmentPlans extends Vue {
  @Prop({ default: () => [] }) manipulations!: Manipulation[];
  @Prop({ default: false }) isUnplannedAppointmentsActive!: Boolean;

  @Emit("openAppointment") emitopenAppointment(id: number): number {
    return id;
  }

  plannedManipulations: Manipulation[] = [];
  notPlannedManipulations: Manipulation[] = [];
  finishedManipulations: Manipulation[] = [];
  closedManipulations: Manipulation[] = [];

  statusTypes: typeof STATUS_TYPES = STATUS_TYPES;

  created() {
    this.filterManipulationsByStatus();
  }

  @Watch("manipulations") filterManipulationsByStatus() {
    this.resetManipulations();
    this.manipulations.forEach((mainpulation: Manipulation) => {
      if (mainpulation.appointment) {
        switch (mainpulation.appointment.completion_status) {
          case STATUS_TYPES.PLANNED: {
            this.plannedManipulations.push(mainpulation);
            break;
          }
          case STATUS_TYPES.FINISHED: {
            this.finishedManipulations.push(mainpulation);
            break;
          }
          case STATUS_TYPES.CLOSED: {
            this.closedManipulations.push(mainpulation);
            break;
          }
          default: {
            debugger;
            break;
          }
        }
      } else {
        this.notPlannedManipulations.push(mainpulation);
      }
    });
  }

  resetManipulations() {
    this.plannedManipulations = [];
    this.finishedManipulations = [];
    this.closedManipulations = [];
    this.notPlannedManipulations = [];
  }

  handleMoveCard(event: any) {
    // const idMovedManipulation = +event.item.id.split("-")[1];
    const changeStatusTo = event.to.dataset.type;
    const idMovedManipulation = event.item.dataset.id;
    let movedManipulation: Manipulation | undefined = this.manipulations.find(
      (m: Manipulation) => m.id === Number(idMovedManipulation)
    );
    debugger;
    if (movedManipulation) {
      switch (changeStatusTo) {
        case STATUS_TYPES.PLANNED: {
          // send request
          // change manipualtion status
          //
          break;
        }
        default: {
          break;
        }
      }
    }
    // if (movedAppointment) {
    //   switch (changeStatusTo) {
    //     case this.statusTypes.NOT_PLANNED: {
    //       if (confirm("?")) {
    //         // TODO: change status instead of plan_id and get status in response
    //         movedAppointment.status = this.statusTypes.PLANNED;
    //         movedAppointment.plan_id = 1;
    //         this.appointments.forEach(a => {
    //           if (a.id === movedAppointment.id) {
    //             a = movedAppointment;
    //             return null;
    //           }
    //         });
    //       } else {
    //         alert("Поля не заполнены");
    //       }
    //       this.updateStatusedlists();
    //       break;
    //     }
    //     case this.statusTypes.PLANNED: {
    //       // TODO: response to back when all field filled in modal
    //       if (confirm("?")) {
    //         // TODO: change status instead of plan_id and get status in response
    //         movedAppointment.status = this.statusTypes.NOT_PLANNED;
    //         movedAppointment.plan_id = 2;
    //         movedAppointment.time_start = "";
    //         movedAppointment.time_finish = "";
    //         this.appointments.forEach(a => {
    //           if (a.id === movedAppointment.id) {
    //             a = movedAppointment;
    //             return null;
    //           }
    //         });
    //       }
    //       this.updateStatusedlists();
    //       // TODO: if fields not filled, then coming back movedAppointment
    //       break;
    //     }
    //     case this.statusTypes.FINISHED: {
    //       if (movedAppointment.status === this.statusTypes.PLANNED) {
    //         // TODO: change status instead of plan_id and get status in response
    //         movedAppointment.status = this.statusTypes.FINISHED;
    //         movedAppointment.plan_id = 3;
    //         this.appointments.forEach(a => {
    //           if (a.id === movedAppointment.id) {
    //             a = movedAppointment;
    //             return null;
    //           }
    //         });
    //       } else {
    //         alert("Вы можете завершить только запланированные приёмы");
    //       }
    //       this.updateStatusedlists();
    //       break;
    //     }
    //     case this.statusTypes.EXPIRED: {
    //       movedAppointment.status = this.statusTypes.EXPIRED;
    //       movedAppointment.plan_id = 4;
    //       this.appointments.forEach(a => {
    //         if (a.id === movedAppointment.id) {
    //           a = movedAppointment;
    //           return null;
    //         }
    //       });
    //       this.updateStatusedlists();
    //       break;
    //     }
    //   }
    // }

    // filterAppointments
  }
}
</script>
<style lang="scss" scoped>
.board {
  display: flex;
  justify-content: space-between;
  position: relative;
}
</style>

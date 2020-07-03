<template>
  <div class="appointment-calendar-header">
    <div class="appointment-calendar-header__select-doctor">
      <div>
        <label class="typo__label">{{
          $t("appointmentCalendar.titleColumnDoctors")
        }}</label>
        <multiselect
          v-model="doctors"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          :placeholder="$t('appointmentCalendar.selectDoctor')"
          :preselect-first="true"
        >
        </multiselect>
      </div>
    </div>
    <div class="appointment-calendar-header__select-data">
      <b-field :label="$t('appointmentCalendar.titleDataPicker')">
        <b-datepicker
          :placeholder="$t('appointmentCalendar.placeholderChooseTime')"
          v-model="selectDates"
          range
          icon-pack="fas"
          icon="calendar-alt"
        />
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";
import { InterfaceDoctor } from "@/types/appointment-calendar";
import Multiselect from "vue-multiselect";

@Component({
  components: {
    Multiselect
  }
})
export default class DataPicker extends Vue {
  @Mutation("setSelectedDoctors") setSelectedDoctors: any;
  @Mutation("setSelectedDates") setSelectedDates: any;

  @Getter("getListDoctors") doctorList: any;

  @Action("ActionListDoctors") getListDoctors: any;

  @Watch("doctorList")
  followListDoctors() {
    this.doctorList.forEach((name: any) => {
      this.options.push(name);
    });
  }

  @Watch("selectDates")
  changeSelectDates() {
    this.setSelectedDates(this.selectDates);
  }

  @Watch("doctors")
  selectDoctors() {
    this.setSelectedDoctors(this.doctors);
  }

  doctors: any = [];
  selectDates: Object[] = [];
  listDoctors: InterfaceDoctor[] = [];
  options: string[] = [];

  created() {
    this.getListDoctors();
  }
}
</script>

<style lang="scss" scoped>
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.appointment-calendar-header {
  display: flex;
  justify-content: space-evenly;
  &__select-data {
    min-width: 333px;
  }
}
</style>

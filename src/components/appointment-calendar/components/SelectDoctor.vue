<template>
  <div class="select-doctor">
    <div class="select-doctor__actions">
      <h2>{{ $t("appointmentCalendar.selectDoctor") }}</h2>
      <multiselect
        v-model="selectedDoctors"
        :options="doctors"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        :placeholder="$t('appointmentCalendar.selectDoctor')"
        :preselect-first="true"
      >
      </multiselect
      ><br />
      <h2>{{ $t("appointmentCalendar.typeVisit") }}</h2>
      <b-field :style="{ width: '100%' }">
        <b-radio-button
          v-model="typeVisit"
          :native-value="$t('appointmentCalendar.typeVisitNormal')"
        >
          <span>{{ $t("appointmentCalendar.typeVisitNormal") }}</span>
        </b-radio-button>

        <b-radio-button
          v-model="typeVisit"
          :native-value="$t('appointmentCalendar.typeVisitParallel')"
        >
          <span>{{ $t("appointmentCalendar.typeVisitParallel") }}</span>
        </b-radio-button>

        <b-radio-button
          v-model="typeVisit"
          :native-value="$t('appointmentCalendar.typeVisitConsistent')"
        >
          {{ $t("appointmentCalendar.typeVisitConsistent") }}
        </b-radio-button>
      </b-field>
    </div>
    <div class="select-doctor__help">
      <div v-if="nameClient" class="select-doctor__help__select-client">
        <span
          >{{ $t("appointmentCalendar.client") }}:
          <strong>{{ nameClient }}</strong></span
        >
      </div>
      <div class="select-doctor__help__work">
        <div class="select-doctor__help__work__day">
          {{
            new Date(selectDate).getDate() +
              "." +
              new Date(selectDate).getMonth() +
              1 +
              "." +
              new Date(selectDate).getFullYear()
          }}
          {{ $t("appointmentCalendar.work") }}:
        </div>
        <div
          class="select-doctor__help__work__doctor"
          v-for="(doc, docIndex) in doctors"
          :key="docIndex"
        >
          <span class="select-doctor__help__work__doctor__name-doctor">{{
            doc
          }}</span>
          <br />
          <span class="select-doctor__help__work__doctor__work-time"
            >10:00:00 - 18:00:00</span
          >
        </div>
      </div>
    </div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="true"
      class="loading-background"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Multiselect from "vue-multiselect";
import { Watch } from "vue-property-decorator";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";

@Component({
  components: {
    Multiselect
  },
  props: {
    nameClient: String,
    selectDate: Date
  }
})
export default class SelectDoctor extends Vue {
  isLoading: Boolean = true;
  selectedDoctors: string[] = [];
  typeVisit: string = "Обычный";
  doctors: string[] = [];

  @Watch("selectedDoctors")
  changeNameClient() {
    this.$emit("emitSelectedDoctors", this.selectedDoctors);
  }

  @Watch("typeVisit")
  changeTypeVisit() {
    this.$emit("emitTypeVisit", this.typeVisit);
  }

  created() {
    api(httpClient).doctors.getList()
      .then((response: any) => {
        this.doctors = response.data.doctors.map((item: any) => {
          return item.name;
        });
      })
      .then(() => (this.isLoading = false));
  }
}
</script>

<style lang="scss">
.select-doctor {
  display: flex;
  &__actions {
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
.loading-background {
  background-color: rgb(255, 255, 255);
}
</style>

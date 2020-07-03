<template>
  <div class="custom-information">
    <div class="custom-information__actions">
      <h2>VIP {{ $t("appointmentCalendar.manager") }}</h2>
      {{ selectDate }}
      <multiselect
        v-model="value"
        :options="managers"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        :placeholder="$t('appointmentCalendar.selectManager')"
        :preselect-first="true"
      >
      </multiselect>
      <br />

      <b-field class="file">
        <b-upload v-model="file">
          <a class="button is-primary">
            <b-icon pack="fas" icon="upload"></b-icon>
            <h2>{{ $t("appointmentCalendar.uploadDocument") }}</h2>
          </a>
        </b-upload>
        <span class="file-name" v-if="file">
          {{ file.name }}
        </span>
      </b-field>
    </div>
    <div class="custom-information__help">
      <div
        :style="{
          textAlign: 'left',
          marginLeft: '40px'
        }"
      >
        <div>
          {{ $t("appointmentCalendar.client") }}:
          <span
            ><strong>{{ nameClient }}</strong></span
          >
        </div>
        <div>
          {{ $t("appointmentCalendar.desiredDateOfRecording") }}:
          <span
            ><strong>{{
              new Date(selectDate).getDate() +
                "." +
                (new Date(selectDate).getMonth() + 1) +
                "." +
                new Date(selectDate).getFullYear()
            }}</strong></span
          >
        </div>
        <br />
        <div>{{ $t("appointmentCalendar.ownCard") }} <span>"BRILLIANT"</span></div>
      </div>
      <div class="custom-information__help__description">
        {{ $t("appointmentCalendar.customInformationDescription") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Multiselect from "vue-multiselect";

@Component({
  components: {
    Multiselect
  },
  props: {
    nameClient: String,
    dateRecord: Date,
    selectDate: Date
  }
})
export default class CustomerInformation extends Vue {

  value: string = "";

  dateRecord: object | string | undefined;

  file: object | null = null;

  managers: string[] = [
    "manager 1",
    "manager 2",
    "manager 3",
    "manager 4",
    "manager 5",
    "manager 6"
  ];
}
</script>

<style lang="scss" scoped>
.custom-information {
  display: flex;
  &__actions {
    width: 50%;
    h2 {
      text-align: left;
    }
  }

  &__help {
    width: 50%;
    &__description {
      background-color: aqua;
      height: fit-content;
      padding: 10px;
      border-radius: 10px;
      margin: 20px 20px 0 20px;
    }
  }
}
</style>

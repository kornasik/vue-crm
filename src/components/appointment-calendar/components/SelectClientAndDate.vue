<template>
  <div class="select-client-and-date">
    <div class="select-client-and-date__actions">
      <h2>Поиск клиента в базе</h2>
      <multiselect
        v-model="clientName"
        :options="clients"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="$t('appointmentCalendar.selectClient')"
        :preselect-first="true"
      >
      </multiselect
      ><br />
      <h2>{{ $t("appointmentCalendar.selectDateRecord") }}</h2>
      <b-field>
        <b-datepicker
          v-model="selectDate"
          icon-pack="fas"
          icon="calendar-alt"
          :placeholder="$t('appointmentCalendar.clickToSelect')"
        >
        </b-datepicker>
      </b-field>
    </div>
    <div class="select-client-and-date__help">
      {{ $t("appointmentCalendar.selectClientAndDateHelp") }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Multiselect from "vue-multiselect";
import { Watch } from "vue-property-decorator";

@Component({components: {
    Multiselect
  },
  props: {
    selectDate: Date
  }
})
export default class SelectClientAndDate extends Vue {
  clientName: string = "";
  date: object = new Date();

  @Watch("value")
  changeNameClient() {
    this.$emit("emitNameClient", this.clientName);
  }

  @Watch("date")
  changeDateRecord() {
    this.$emit("emitDateRecord", this.date);
  }

  clients: string[] = [
    "Client 1",
    "Client 2",
    "Client 3",
    "Client 4",
    "Client 5",
    "Client 6"
  ];
}
</script>

<style lang="scss" scoped>
.select-client-and-date {
  display: flex;
  &__actions {
    width: 50%;
  }

  &__help {
    width: 50%;
    background-color: aqua;
    height: fit-content;
    padding: 10px;
    border-radius: 10px;
    margin: 50px 20px 0 20px;
  }
}

h2 {
  text-align: left;
}
</style>

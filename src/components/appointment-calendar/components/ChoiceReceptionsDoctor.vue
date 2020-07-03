<template>
  <div class="choice-receptions-doctor">
    <br />
    <h2>{{ $t("appointmentCalendar.reception") }} {{ nameDoctor }} *</h2>
    <multiselect
      v-model="typeReception"
      :options="typesReceptions"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Выберите приём"
      :preselect-first="true"
    >
    </multiselect>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Multiselect from "vue-multiselect";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    Multiselect
  },
  props: {
    nameDoctor: String
  }
})
export default class ChoiceReceptionsDoctor extends Vue {
  typeReception: string = "";
  typesReceptions: string[] = ["Reception1", "Reception2", "Reception3"];
  nameDoctor: string | undefined;

  @Watch("typeReception")
  selectTypeReception() {
    this.$emit("emitSelectTypeReception", {
      nameDoctor: this.nameDoctor,
      typeReception: this.typeReception
    });
  }
}
</script>

<style lang="scss" scoped>
.choice-receptions-doctor {
  h2 {
    text-align: left;
  }
}
</style>

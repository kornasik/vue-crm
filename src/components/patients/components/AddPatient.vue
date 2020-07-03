<template>
  <div class="container">
    <FormViewer :form="form" @sumbitForm="emitCreatePatient($event)">
      <form @submit.prevent>
        <div class="col-md-3">
          <label>{{ $t("familyList.selectFamily") }} :</label>
          <o-field>
            <o-select v-model="patient.family_id">
              <option
                v-for="family in families"
                :value="family.id"
                :key="family.id"
              >
                {{ family.name }}
              </option>
            </o-select>
          </o-field>
        </div>
      </form>
    </FormViewer>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {Prop} from "vue-property-decorator";
  import {Patient} from "@/shared/classes/patient.model";
  import {Family} from "@/shared/classes/family.model";
  import OSelect from "@/components/shared/OSelect.vue";
  import OField from "@/components/shared/OField/OField.vue";
  import FormViewer from "@/components/FormViewer/FormViewer.vue";
  import {FORM_TYPES} from "@/shared/enums/form-types";
  import { Getter, Action } from "vuex-class";

  @Component({
    components: {
      OSelect,
      OField,
      FormViewer
    }
  })
  export default class AddForm extends Vue {
    @Prop({default: () => ({family_id: '', content:[]})}) patient!: Patient;

    @Getter("families/FAMILIES") families!: Family[];
    @Getter("formbuilder/FORM") form!: object;
    @Action("families/GET_FAMILIES") getFamilies!: any;
    @Action("formbuilder/GET_DEFAULT_PATIENT_FORM") getFormByTypeId!: (id: number) => void;

    created() {
      this.init()
    }

    init() {
      this.getFamilies();
      this.getFormByTypeId(FORM_TYPES.CREATE_PATIENT);
    }

    emitCreatePatient(form: any) {
      debugger;
      this.patient.content = form.formValues;
      this.$emit("createPatientEvent", this.patient);
    }
  }

</script>

<style scoped>
</style>

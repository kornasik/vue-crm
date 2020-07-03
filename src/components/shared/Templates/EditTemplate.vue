<template>
  <div class="modal-add-template">
    <o-field
      :type="$v.editingTemplate.name.$error ? 'is-danger' : 'is-success'"
    >
      <o-input
        type="text"
        v-model="$v.editingTemplate.name.$model"
        :placeholder="$t('general.title')"
      />
      <multiselect
        v-model="editingTemplate.icd_list"
        :options="icdlist"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        :placeholder="$t('general.content')"
        :multiple="true"
        :limit="2"
        track-by="id"
        label="name"
      />
    </o-field>
    <o-field
      :type="$v.editingTemplate.content.$error ? 'is-danger' : 'is-success'"
    >
      <o-input
        type="text"
        v-model="$v.editingTemplate.content.$model"
        :placeholder="$t('general.content')"
      />
    </o-field>
    <o-button type="is-success" @click="handleSaveTemplate">{{
      $t("general.save")
    }}</o-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import OField from "@/components/shared/OField/OField.vue";
import OButton from "@/components/shared/OButton/OButton.vue";
import OInput from "@/components/shared/OInput/OInput.vue";
import Template from "@/shared/classes/template.model";
import ICD from "@/shared/classes/icd.model";
import multiselect from "vue-multiselect";
import { Validations } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";
@Component({
  name: "ModalEditTemplate",
  components: {
    OField,
    OButton,
    OInput,
    multiselect
  }
})
export default class ModalEditTemplate extends Vue {
  @Prop({ default: () => [] }) icdlist!: ICD[];
  @Prop({ default: () => null }) template!: Template;

  editingTemplate: Template = new Template();

  @Watch("template", { immediate: true, deep: true }) onTemplateUpdate(
    updatedTemplate: Template
  ) {
    if (!this.isTemplateForAdd()) {
      this.editingTemplate.id = updatedTemplate.id;
      this.editingTemplate.category_id = updatedTemplate.category_id;
      this.editingTemplate.name = updatedTemplate.name;
      this.editingTemplate.content = updatedTemplate.content;
      this.editingTemplate.icd_list = this.icdlist.filter((icd: ICD) => {
        const isIcdAdded = updatedTemplate.icd_list.find(
          (icdId: number) => icdId === icd.id
        );
        return isIcdAdded;
      });
    }
  }

  @Validations()
  validations = {
    editingTemplate: {
      name: { required },
      content: { required }
    }
  };

  handleSaveTemplate() {
    if (!(this.$v as any).editingTemplate.$invalid) {
      if (this.isTemplateForAdd()) {
        this.emitAddTemplate();
      } else {
        this.emitEditTemplate();
      }
    } else {
      (this.$v as any).editingTemplate.$touch();
    }
  }

  @Emit("addTemplate") emitAddTemplate() {
    const template = { ...this.editingTemplate };
    template.icd_list = template.icd_list.map(icd => icd.id);
    return template;
  }

  @Emit("editTemplate") emitEditTemplate() {
    const template = { ...this.editingTemplate };
    template.icd_list = template.icd_list.map(icd => icd.id);
    return template;
  }

  isTemplateForAdd() {
    return !this.template;
  }
}
</script>

<style>
/* TODO: make scoped and create global styles for multiselect */
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.modal-add-template {
  padding: 30px;
}
.multiselect__tags {
  padding: 2px 40px 2px 8px !important;
}
.multiselect__content-wrapper {
  max-height: 120px !important;
}
</style>

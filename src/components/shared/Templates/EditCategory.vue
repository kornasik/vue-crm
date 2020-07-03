<template>
  <div class="modal-add-template">
    <o-field
      :type="$v.editingCategory.name.$error ? 'is-danger' : 'is-success'"
    >
      <o-input
        type="text"
        v-model="$v.editingCategory.name.$model"
        :placeholder="$t('general.title')"
      />
    </o-field>
    <o-button type="is-success" @click="handleSaveCategory">{{
      $t("general.save")
    }}</o-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import OField from "@/components/shared/OField/OField.vue";
import OButton from "@/components/shared/OButton/OButton.vue";
import OInput from "@/components/shared/OInput/OInput.vue";
import ComplaintCategory from "@/shared/classes/complaint-category.model";
import multiselect from "vue-multiselect";
import { Validations } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";
@Component({
  name: "ModalEditCategory",
  components: {
    OField,
    OButton,
    OInput,
    multiselect
  }
})
export default class ModalEditCategory extends Vue {
  @Prop({ default: () => [] }) category!: ComplaintCategory;

  editingCategory: ComplaintCategory = new ComplaintCategory();

  @Watch("category", { immediate: true, deep: true }) onCategoryUpdate(updatedCategory: ComplaintCategory) {
    if (!this.isCategoryForAdd()) {
      this.editingCategory.id = updatedCategory.id;
      this.editingCategory.name = updatedCategory.name;
    }
  }

  @Validations()
  validations = {
    editingCategory: {
      name: { required }
    }
  };

  handleSaveCategory() {
    if (!(this.$v as any).editingCategory.$invalid) {
      if (this.isCategoryForAdd()) {
        this.emitAddCategory();
      } else {
        this.emitEditCategory();
      }
    } else {
      (this.$v as any).editingCategory.$touch();
    }
  }

  @Emit("addCategory") emitAddCategory() {
    return this.editingCategory;
  }

  @Emit("editCategory") emitEditCategory() {
    return this.editingCategory;
  }

  isCategoryForAdd() {
    return !this.category;
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

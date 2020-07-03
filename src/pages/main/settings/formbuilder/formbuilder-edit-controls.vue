<template>
  <div>
    <Breadcrumbs />
    <FormBuilder
      v-if="isFormBuilderReady()"
      v-model="editableFormItems"
      :formName="form.name || ''"
      :isDefault="form.is_default"
      :availableFormItems="formItems || []"
      @addFormItem="handleAddFormItem"
      @editFormItem="handleEditFormItem"
      @deleteFormItem="handleDeleteFormItem"
      @cancelAdd="handleCancelAdd"
      @updateName="handleUpdateName"
      @updateDefault="handleUpdateDefault"
    />
    <o-loading :isShow="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import FormBuilder from "@/components/formbuilder/FormBuilder.vue";
import OLoading from "@/components/shared/OLoading.vue";
import { isExist } from "@/shared/utils";

export default {
  data() {
    return {
      form: null,
      editableFormItems: [],
      isLoading: true
    };
  },
  components: {
    Breadcrumbs,
    FormBuilder,
    OLoading
  },
  computed: {
    ...mapGetters("formbuilder", ["formItems"])
  },
  methods: {
    ...mapActions("formbuilder", [
      "getFormById",
      "geFormItemsList",
      "createFormItem",
      "updateFormItemById",
      "deleteFormItemById",
      "updateFormById"
    ]),
    async getForm() {
      const id = +this.$route.params.id;
      if (id) {
        this.form = await this.getFormById(id);
        if (isExist(this.form, "items", "0", "next")) {
          this.editableFormItems = this.form.items[0].next;
        }
      }
      this.isLoading = false;
    },
    async handleAddFormItem(formItem) {
      try {
        if (isExist(this.form, "items", "0")) {
          const parentBlockId = +this.form.items[0].block_id;
          const blockId = parentBlockId + 1; // уровень вложенности
          const groupId = +this.form.items[0].id; // id в который обернуты контролы одного уровня

          const createFormItemRequest = { ...formItem };
          createFormItemRequest.form_id = this.form.id;
          createFormItemRequest.block_id = blockId;
          createFormItemRequest.group_id = groupId;

          const formItemResponse = await this.createFormItem(
            createFormItemRequest
          );

          this.editableFormItems = this.editableFormItems.map(formItem => {
            if (!formItem.id) {
              createFormItemRequest.id = formItemResponse.data.refId;
              return createFormItemRequest;
            }
            return formItem;
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    async handleEditFormItem(formItem) {
      try {
        const res = await this.updateFormItemById(formItem);
        for (let i = 0; i < this.editableFormItems.length; i++) {
          if (+this.editableFormItems[i].id === +formItem.id) {
            Object.assign(this.editableFormItems[i], formItem);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    async handleDeleteFormItem(formItem) {
      try {
        if (confirm(this.$t("formBuilder.isDelete"))) {
          const res = await this.deleteFormItemById(+formItem.id);
          this.editableFormItems = this.editableFormItems.filter(
            fi => +fi.id !== +formItem.id
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
    handleCancelAdd() {
      this.editableFormItems = this.editableFormItems.filter(
        formItem => formItem.id
      );
    },
    async handleUpdateName(name) {
      try {
        await this.updateFormById({ id: this.form.id, name });
        this.form.name = name;
      } catch (e) {
        console.error(e);
      }
    },
    async handleUpdateDefault(value) {
      try {
        await this.updateFormById({ id: this.form.id, is_default: value });
        this.form.is_default = value;
      } catch (e) {
        console.error(e);
      }
    },
    isFormBuilderReady() {
      return this.form && this.editableFormItems;
    }
  },
  created() {
    this.editableFormItems = [];
    this.getForm();
    this.geFormItemsList();
  }
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  border: 1px solid #212121;
  border-radius: 20%;
  width: 190px;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 20px;
  transition: 0.1s ease-in-out;
  &:hover {
    i {
      transform: scale(1.3);
      color: #57af3c !important;
    }
  }
  .icon {
    i {
      font-size: 40px;
      color: #2c339e;
      transition: 0.3s linear;
    }
  }
  &__label {
    text-align: center;
  }
}
.form-container {
  display: flex;
  flex-wrap: wrap;
}
</style>

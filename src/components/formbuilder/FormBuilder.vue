<template>
  <div class="container">
    <div class="columns column">
      <div class="column is-9">
        <div class="form-header">
          <div class="form-name">
            <p class="form-name__label">
              {{ $t("formbuilder.formName") }}
            </p>
            <template v-if="!isEditFormName">
              <p class="form-name__value">{{ formName }}</p>
              <o-button icon-left="pen" @click="editFormName"></o-button>
            </template>
            <template v-else>
              <o-input v-model="localFormName" />
              <o-button icon-left="times" @click="closeEditFormName" />
              <o-button
                icon-left="check"
                @click="emitUpdateName(localFormName)"
              />
            </template>
          </div>
          <div class="form-switch">
            <o-switch :value="isDefault" @input="onSwitch">{{
              $t("general.byDefault")
            }}</o-switch>
          </div>
        </div>
        <h3>{{ $t("formBuilder.elementsInForm") }}</h3>
        <draggable
          class="form-items-wrapper"
          :list="value"
          :sort="false"
          group="formItems"
          @add="handleDragFormItem"
        >
          <FormItem
            class="form-item"
            v-for="(formItem, i) in value"
            :key="`added-formItem-${i}`"
            :formItem="formItem"
            @editFormItem="handleEditFormItem($event)"
            @deleteFormItem="handleDeleteFormItem($event)"
          />
        </draggable>
      </div>
      <div class="column is-3">
        <h3>{{ $t("formBuilder.availableFormItems") }}</h3>
        <draggable
          class="available-items-wrapper"
          :list="availableFormItems"
          :group="{ name: 'formItems', pull: 'clone', put: false }"
          :sort="false"
        >
          <div
            class="available-item"
            v-for="(availableFormItem, i) in availableFormItems"
            :key="'available-item-' + i"
            :data-formItem-type-id="availableFormItem.content.id"
          >
            {{ availableFormItem.content.name }}
          </div>
        </draggable>
      </div>
    </div>
    <ModalEditFormItem
      v-if="isShowModalEditFormItem"
      :formItem="formItemForEdit"
      @saveFormItem="handleSaveFormItem($event)"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import FormItem from "@/components/formbuilder/ViewFormItems/FormItem.vue";
import draggable from "vuedraggable";
import ModalEditFormItem from "@/components/formbuilder/ModalEditFormItem/ModalEditFormItem.vue";
import OButton from "@/components/shared/OButton/OButton.vue";
import OInput from "@/components/shared/OInput/OInput.vue";
import OSwitch from "@/components/shared/OSwitch.vue";

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    formName: {
      type: String,
      default: ""
    },
    availableFormItems: {
      type: Array,
      default: () => []
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  components: {
    FormItem,
    draggable,
    ModalEditFormItem,
    OButton,
    OInput,
    OSwitch
  },
  data() {
    return {
      isShowModalEditFormItem: false,
      formItemForEdit: null,
      isEditFormName: false,
      localFormName: ""
    };
  },
  methods: {
    editFormName() {
      this.isEditFormName = true;
    },
    closeEditFormName() {
      this.isEditFormName = false;
    },
    resetEditFormName() {
      this.localFormName = this.formName;
    },
    handleDragFormItem(event) {
      // добавление нового
      const typeId = +event.item.dataset.formitemTypeId;
      const elementDescription = this.availableFormItems.find(
        formItem => formItem.content.id === typeId
      );
      if (elementDescription) {
        this.formItemForEdit = this.getNewFormItemByType(
          elementDescription.content.type
        );
        this.formItemForEdit.position = +event.newIndex;
        this.showModalEditFormItem();
      }
      return false;
    },
    handleSaveFormItem(formItem) {
      if (formItem.id) {
        this.$emit("editFormItem", formItem);
      } else {
        this.$emit("addFormItem", formItem);
      }
      this.hideModalEditFormItem();
      this.formItemForEdit = null;
    },
    handleCancel() {
      this.$emit("cancelAdd");
      this.hideModalEditFormItem();
      this.formItemForEdit = null;
    },
    handleDeleteFormItem(formItem) {
      this.$emit("deleteFormItem", formItem);
    },
    emitUpdateName(name) {
      this.$emit("updateName", name);
      this.closeEditFormName();
    },
    handleEditFormItem(formItem) {
      this.formItemForEdit = Object.assign({}, formItem);
      this.showModalEditFormItem();
    },
    showModalEditFormItem() {
      this.isShowModalEditFormItem = true;
    },
    hideModalEditFormItem() {
      this.isShowModalEditFormItem = false;
    },
    getNewFormItemByType(type) {
      switch (type) {
        case "simple-input": {
          return {
            form_id: null,
            block_id: null,
            group_id: null,
            position: null,
            content: {
              type: "simple-input",
              label: "Label here",
              id: null,
              placeholder: "Enter text here:",
              required: false,
              disabled: false,
              newIndex: null,
              oldIndex: null
            }
          };
        }
        case "simple-textarea": {
          return {
            form_id: null,
            block_id: null,
            group_id: null,
            position: null,
            content: {
              type: "simple-textarea",
              label: "Label here",
              id: null,
              placeholder: "Enter text here:",
              required: false,
              disabled: false,
              newIndex: null,
              oldIndex: null
            }
          };
        }
        case "simple-select": {
          return {
            form_id: null,
            block_id: null,
            group_id: null,
            position: null,
            content: {
              type: "simple-select",
              label: "Label here",
              id: null,
              placeholder: "Enter text here:",
              required: false,
              disabled: false,
              newIndex: null,
              oldIndex: null,
              options: [{ name: "Option 1", value: "option-1", refId: "" }]
            }
          };
        }
        case "simple-checkbox": {
          return {
            form_id: null,
            block_id: null,
            group_id: null,
            position: null,
            content: {
              type: "simple-checkbox",
              label: "Label here",
              id: null,
              placeholder: "Enter text here:",
              required: false,
              disabled: false,
              newIndex: null,
              oldIndex: null,
              options: [{ name: "Option 1", value: "option-1", refId: "" }]
            }
          };
        }
        case "simple-radiobutton": {
          return {
            form_id: null,
            block_id: null,
            group_id: null,
            position: null,
            content: {
              type: "simple-radiobutton",
              label: "Label here",
              id: null,
              placeholder: "Enter text here:",
              required: false,
              disabled: false,
              newIndex: null,
              oldIndex: null,
              options: [{ name: "Option 1", value: "option-1", refId: "" }]
            }
          };
        }
      }
    },
    onSwitch(newValue) {
      this.$emit("updateDefault", newValue);
    }
  },
  watch: {
    formName: {
      handler: function(val) {
        this.localFormName = val;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
.form-items-wrapper {
  position: relative;
  min-height: 300px;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  border: 2px dashed #afafaf;
  margin-top: 10px;
}

.form-item {
  max-width: 60%;
  margin: 0 auto;
  position: relative;
  padding: 20px;
  border-radius: 5px;
}

.form-item:hover {
  background-color: #f2f2f2;
}

.available-items-wrapper {
  padding-top: 10px;
}

.available-item {
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: #069cfa;
  border-radius: 5px;
  color: #fff;
  font-size: 1.1rem;
  transition: 0.2s ease-in-out;
}

.available-item:hover {
  background-color: #1771f1;
}

.available-item + .available-item {
  margin-top: 10px;
}

.form-name {
  display: flex;
}

.form-name__value {
  font-weight: 600;
}
</style>

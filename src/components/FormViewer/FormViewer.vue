<template>
  <div class="container">
    <div class="form-wrapper">
      <h2 class="title">{{ form ? form.name : "" }}</h2>
      <div class="form-items-wrapper">
        <component
          class="form-item"
          :class="{ 'form-item_error': formItem.$invalid && formItem.$dirty }"
          v-for="(formItem, i) in $v.formItems.$each.$iter"
          :key="'formItem-' + formItem.id + i"
          :is="formItem.$model.content.type"
          :dragName="dragName"
          v-model="formItem.$model.content"
          :isTemplateDragging="isTemplateDragging"
          @addTemplateFromDrag="handleAddTemplate(formItem.$model.id, $event)"
        ></component>
        <slot></slot>
        <footer class="buttons">
          <b-button
            :type="!$v.formItems.$invalid ? 'is-success' : ''"
            outlined
            @click="emitFormValues"
          >
            {{ $t("formViewer.send") }}
          </b-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "./formItems/Input.vue";
import Select from "./formItems/Select.vue";
import Checkbox from "./formItems/Checkbox.vue";
import Radio from "./formItems/Radio.vue";
import Textarea from "./formItems/Textarea.vue";
import { required, requiredIf } from "vuelidate/lib/validators";
const isValueEmty = content => {
  if (content.required) {
    if (content.value || (content.selected && content.selected.length)) {
      return content.value || (content.selected && content.selected.length);
    }
    return false;
  }
  return true;
};
export default {
  props: {
    dragName: {
      type: String,
      default: "formItems"
    },
    isTemplateDragging: {
      type: Boolean,
      default: false
    },
    recommendedTemplates: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => null
    }
  },
  components: {
    "simple-input": Input,
    "simple-select": Select,
    "simple-checkbox": Checkbox,
    "simple-radiobutton": Radio,
    "simple-textarea": Textarea
  },
  data() {
    return {
      formItems: Array
    };
  },
  validations: {
    formItems: {
      $each: {
        content: {
          value: {
            required: requiredIf(function(content) {
              return !isValueEmty(content);
            })
          },
          selected: {
            required: requiredIf(function(content) {
              return !isValueEmty(content);
            })
          }
        }
      }
    }
  },
  watch: {
    form: {
      handler: function(val) {
        if (val && val.items && val.items[0].next) {
          this.formItems = val.items[0].next;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    emitFormValues() {
      this.$v.formItems.$touch();
      if (!this.$v.formItems.$invalid) {
        const formValues = this.formItems.map(formItem => {
          let value = null;
          if (formItem.content.selected) {
            value = this.getValueFromOptionsBySelected(formItem.content);
          } else {
            value = formItem.content.value || null;
          }
          return {
            form_item_id: +formItem.id,
            value: value
          };
        });
        const form = {
          formId: this.form.id,
          formValues
        };
        this.$emit("sumbitForm", form);
      } else {
        alert(this.$t("formViewer.fillFields"));
      }
    },
    getValueFromOptionsBySelected(content) {
      return (
        content.options
          .filter(option => {
            return content.selected.findIndex(
              selected => selected === option.value
            );
          })
          .map(option => {
            return { value: option.value, refId: option.refId };
          }) || []
      );
    },
    handleAddTemplate(formItemId, templateId) {
      debugger;
      const template = this.recommendedTemplates.find(
        template => template.id === +templateId
      );
      const formItem = this.formItems.find(
        formItem => formItem.id === formItemId
      );
      if (!formItem.content.value) {
        formItem.content.value = "";
      }
      if (template && template.content) {
        if (this.isNeedToAddSpace(formItem.content.value)) {
          formItem.content.value += " ";
        }
        formItem.content.value += template.content;
      }
    },
    isNeedToAddSpace(string) {
      return string.length > 0;
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 10px 0 5px;
  font-size: 1.3rem !important;
  font-weight: 600;
  line-height: 1.5rem;
}

.form-items-wrapper {
  position: relative;
  min-height: 300px;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  margin-top: 10px;
}

.buttons {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.form-item {
  border-radius: 5px;
  padding: 5px;
}
.form-item_error {
  background-color: #ffe1e1;
}
</style>

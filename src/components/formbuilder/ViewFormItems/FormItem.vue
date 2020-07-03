<template>
  <div>
    <component :is="formItem.content.type" :obj="formItem.content"></component>
    <div class="buttons-actions">
      <b-button
        icon-pack="fas"
        icon-left="cog"
        @click="emitEditFormItem"
      ></b-button>
      <b-button
        icon-pack="fas"
        icon-left="times"
        @click="emitDeleteFormItem"
      ></b-button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Input from "./formItems/Input.vue";
import Select from "./formItems/Select.vue";
import Checkbox from "./formItems/Checkbox.vue";
import Radio from "./formItems/Radio.vue";
import Textarea from "./formItems/Textarea.vue";

export default {
  props: {
    formItem: Object
  },
  components: {
    "simple-input": Input,
    "simple-select": Select,
    "simple-checkbox": Checkbox,
    "simple-radiobutton": Radio,
    "simple-textarea": Textarea
  },
  methods: {
    emitEditFormItem() {
      this.$emit("editFormItem", this.formItem);
    },
    emitDeleteFormItem() {
      this.$emit("deleteFormItem", this.formItem);
    }
  }
};
</script>

<style scoped>
.buttons-actions {
  position: absolute;
  right: 20px;
  top: 4px;
}

.buttons-actions button + button {
  margin-left: 4px;
}
</style>

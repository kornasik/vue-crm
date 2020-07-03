<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <component
            v-if="editingFormItem"
            :is="editingFormItem.content.type"
            v-model="editingFormItem.content"
            @saveFormItem="handleSaveFormItem"
            @cancel="handleCancel"
          ></component>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Input from "./formItems/Input.vue";
import Select from "./formItems/Select.vue";
import Checkbox from "./formItems/Checkbox.vue";
import Radio from "./formItems/Radio.vue";
import Textarea from "./formItems/Textarea.vue";

export default {
  data() {
    return {
      editingFormItem: null
    };
  },
  props: {
    formItem: Object
  },
  components: {
    "simple-input": Input,
    "simple-textarea": Textarea,
    "simple-select": Select,
    "simple-checkbox": Checkbox,
    "simple-radiobutton": Radio
  },
  methods: {
    handleSaveFormItem() {
      this.$emit("saveFormItem", this.editingFormItem);
    },
    handleCancel() {
      this.$emit("cancel");
    }
  },
  created() {
    this.editingFormItem = Object.assign({}, this.formItem);
  }
};
</script>

<style>
.modal-header {
  flex-direction: column;
}

.modal-header div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal-container {
  width: 700px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.col-el {
  display: flex;
  flex-direction: column !important;
}

.col-el input {
  margin-bottom: 10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

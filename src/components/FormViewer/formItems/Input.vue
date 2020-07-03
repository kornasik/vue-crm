<template>
  <draggable
    class="drop-zone"
    :class="{ 'drop-zone__active': isTemplateDragging }"
    draggable="false"
    :list="[]"
    :group="{ name: dragName, put: true }"
    @add="handleAdd($event)"
  >
    <label
      class="view_subtitle"
      :class="{ view_subtitle__required: value.required }"
      >{{ value.label }}</label
    >
    <b-input
      :value="value.value"
      @input="emitValueChange('value', $event)"
    ></b-input>
    <slot></slot>
  </draggable>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  components: {
    Draggable
  },
  props: {
    value: Object,
    dragName: String,
    isTemplateDragging: Boolean
  },
  methods: {
    emitValueChange(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    },
    handleAdd(dragEvent) {
      const templateId = dragEvent.item.dataset.templateId;
      this.$emit("addTemplateFromDrag", templateId);
    }
  }
};
</script>

<style lang="scss" scoped>
.view_subtitle {
  display: flex;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 10px 0 5px;
  font-size: 1.15rem !important;
  font-weight: 500;
  line-height: 1.5rem;
  &__required:after {
    content: "*";
    font-size: 24px;
    color: red;
  }
}

.drop-zone {
  position: relative;
}

.drop-zone__active:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px dashed darkgray;
  animation: border-dance 1s infinite ease-in-out;
}

@keyframes border-dance {
  0% {
    border-color: darkgray;
  }
  50% {
    border-color: #000;
  }
  100% {
    border-color: darkgray;
  }
}
</style>

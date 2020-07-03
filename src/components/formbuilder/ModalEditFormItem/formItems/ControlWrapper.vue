<template>
  <div class="form-item-wrapper">
    <div class="form-item__close">
      <b-button
        icon-pack="fas"
        icon-left="times"
        @click="emitCancel"
      ></b-button>
    </div>
    <div class="form-item__create">
      <slot name="create"></slot>
    </div>
    <div class="form-item__view">
      <slot name="view"></slot>
    </div>
    <div class="form-item__buttons">
      <b-button type="is-danger" @click="emitCancel">{{
        $t("formBuilder.cancel")
      }}</b-button>
      <b-button :type="isValid ? 'is-success' : ''" @click="emitAddFormItem">{{
        $t("formBuilder.save")
      }}</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isValid: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    emitAddFormItem() {
      this.$emit("saveFormItem");
    },
    emitCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss" scoped>
.form-item-wrapper {
  display: flex;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  padding: 20px;
}
.form-item__create {
  width: 50%;
  padding-right: 10px;
}
.form-item__view {
  width: 50%;
  padding-left: 10px;
  border-left: 1px solid #ddd;
}
.form-item__buttons {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 15px;
}
button + button {
  margin-left: 10px;
}

.form-item__close {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>

<template>
  <div :id="'input-' + obj.id">
    <label
      class="view_subtitle"
      :class="{ view_subtitle__required: obj.required }"
      >{{ obj.label }}</label
    >
    <b-input :value="obj.value"></b-input>
  </div>
</template>

<script>
export default {
  props: {
    obj: Object
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

.checkbox-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: flex-start;
  max-height: 330px;
  overflow-y: scroll;
}

.checkbox-wrapper {
  display: flex;
  width: 50%;
}
</style>

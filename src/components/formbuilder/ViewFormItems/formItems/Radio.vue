<template>
  <div :id="'checkbox-' + obj.id">
    <label
      class="view_subtitle"
      :class="{ view_subtitle__required: obj.required }"
      >{{ obj.label }}</label
    >
    <div class="list-wrapper">
      <div
        class="radio-wrapper"
        v-for="option in obj.options"
        :key="option.name"
      >
        <b-radio :native-value="option.value" name="radio">
          {{ option.name }}
        </b-radio>
      </div>
    </div>
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

.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: flex-start;
  max-height: 330px;
  overflow-y: scroll;
}

.radio-wrapper {
  display: flex;
  width: 50%;
}
</style>

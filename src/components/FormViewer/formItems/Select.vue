<template>
  <div :id="'checkbox-' + selectContent.id">
    <label
      class="view_subtitle"
      :class="{ view_subtitle__required: selectContent.required }"
      >{{ selectContent.label }}</label
    >
    <b-select
      v-model="selectContent.value"
      @input="emitValueChange('value', $event)"
    >
      <option
        v-for="option in selectContent.options"
        :key="option.name"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </b-select>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      selectContent: Object
    };
  },
  watch: {
    value: {
      handler: function(val) {
        this.selectContent = Object.assign({}, val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    emitValueChange(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
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

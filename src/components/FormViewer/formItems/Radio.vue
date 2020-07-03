<template>
  <div :id="'checkbox-' + radioContent.id">
    <label
      class="view_subtitle"
      :class="{ view_subtitle__required: radioContent.required }"
      >{{ radioContent.label }}</label
    >
    <div class="list-wrapper">
      <div
        class="radio-wrapper"
        v-for="option in radioContent.options"
        :key="option.name"
      >
        <b-radio
          :native-value="option.value"
          name="radio"
          v-model="radioContent.value"
          @input="emitValueChange($event)"
        >
          {{ option.name }}
        </b-radio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      radioContent: Object
    };
  },
  watch: {
    value: {
      handler: function(val) {
        this.radioContent = Object.assign({}, val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    emitValueChange(newValue) {
      this.radioContent.value = newValue;
      this.$emit("input", this.radioContent);
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

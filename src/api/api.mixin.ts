import Vue from "vue";

Vue.mixin({
  beforeCreate() {
    const options: any = this.$options;
    if (options.api) {
      this.$api = options.api;
    } else if (options.parent && options.parent.$api) {
      this.$api = options.parent.$api;
    }
  }
});

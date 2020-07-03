<template>
  <div class="tag-wrapper">
    <span
      class="tag"
      :class="{ selected: selected }"
      @click.stop="emitSelectedTags(tag.name)"
    >
      {{ tag.name }}
    </span>
    <span class="count-tag">
      {{ tag.count }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    tag: Object
  },
  data: () => ({
    selected: false
  }),
  methods: {
    emitSelectedTags(tagName) {
      this.selected = !this.selected;
      this.$emit("selectedTags", tagName);
    }
  }
};
</script>

<style scoped lang="scss">
.tag {
  margin-right: auto;
  cursor: pointer;
  &-wrapper {
    margin-right: auto;
  }
}

.count-tag {
  font-size: 12px;
  color: gray;
}

.selected {
  border: 1px solid #2798d5;
}

.selected::after {
  content: "✖";
  color: red;
  margin-top: 2px;
  margin-left: 5px;
  font-size: 12px;
}
</style>

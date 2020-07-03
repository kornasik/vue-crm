<template>
  <div class="card" :style="{ marginTop: '20px' }">
    <div class="card-header-title mx-auto">{{ lead.name }}</div>
    <div>
      <span
        class="tag tag-item"
        v-for="({ tag }, tagIndex) in lead.tags"
        :key="tagIndex"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "status-card",
  props: {
    lead: Object
  },
  methods: {
    emitClick() {
      this.$emit("clickEvent", this.$store.state.Status.filters);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-custom:hover {
  cursor: pointer;
}
.card-custom:active {
  cursor: grabbing;
}

.tag-item {
  margin: 0 5px 5px 5px;
}
</style>

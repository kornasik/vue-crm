<template>
  <div class="contact-tag">
    <div
      v-for="(tag, tagIndex) in this.$store.state.Contact.tagContact"
      :key="tagIndex"
    >
      <div class="contact-tag__tag-item">{{ tag }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagContact",
  components: {},
  data: () => ({})
};
</script>

<style scoped lang="scss">
.contact-tag {
  display: flex;
  margin-top: 10px;
  &__tag-item {
    background: rgb(190, 190, 190, 0.2);
    border-radius: 4px;
    border: 1px solid lightgray;
    font-size: 14px;
    color: black;
    margin-right: 7px;
    padding: 4px;
  }
}
</style>

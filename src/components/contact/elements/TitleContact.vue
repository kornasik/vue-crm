<template>
  <div class="contact-name">
    <div class="contact-name__first-name">
      {{ name }}
    </div>
    <div class="contact-name__last-name">
      {{ surname }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NameContact",
  components: {},
  data: () => ({
    name: "",
    surname: ""
  }),
  created() {
    console.log(this.$store.state.Contact);
    console.log(this.$store.state.Contact);
    console.log(this.$store.state.Contact);
    console.log(this.$store.state.Contact);
    this.name = this.$store.state.Contact.fieldValue.params[0].value;
    this.surname = this.$store.state.Contact.fieldValue.params[1].value;
  }
};
</script>

<style scoped lang="scss">
.contact-name {
  display: flex;
  font-size: 18px;

  &__last-name {
    padding: 0 5px;
  }
}
</style>

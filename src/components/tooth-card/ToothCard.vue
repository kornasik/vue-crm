<template>
  <div class="container">
    <div class="tooth-card">
      <ToothCardHeader />
      <ToothCardContent :edit="edit" />
    </div>
  </div>
</template>

<script>
import ToothCardHeader from "./components/ToothCardHeader";
import ToothCardContent from "./components/ToothCardContent";

export default {
  name: "ToothCard",
  props: {
    edit: {
      default: true,
      type: Boolean
    }
  },
  components: {
    ToothCardContent,
    ToothCardHeader
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>

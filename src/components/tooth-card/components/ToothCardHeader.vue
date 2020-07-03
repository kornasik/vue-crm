<template>
  <div class="tooth-card__header">
    <SelectAge />
    <Button />
  </div>
</template>

<script>
import SelectAge from "../elements/SelectAge";
import Button from "../elements/Button";

export default {
  name: "ToothCardVue",
  components: {
    SelectAge,
    Button
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.tooth-card__header {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

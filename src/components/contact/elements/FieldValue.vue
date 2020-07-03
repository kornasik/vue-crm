<template>
  <td class="main-contact__list-item--field-value text-center">
    <RenderTypeInput :field="field" />
  </td>
</template>

<script>
import RenderTypeInput from "./RenderTypeInput";
export default {
  name: "FieldValue",
  props: {
    field: Object
  },
  components: {
    RenderTypeInput
  },
  methods: {
    addValue() {
      this.$store.commit("setModalType", this.field.type);
      this.$store.commit("setModalAddValue", true);
    }
  }
};
</script>

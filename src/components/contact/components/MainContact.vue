<template>
  <div class="main-contact">
    <table class="main-contact__list">
      <tr
        class="main-contact__list-item"
        v-for="(field, fieldIndex) in this.commonDataContact"
        :key="fieldIndex"
      >
        <FieldLabel :field="field" />
        <FieldValue :field="field" />
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FieldLabel from "../elements/FieldLabel";
import FieldValue from "../elements/FieldValue";
export default {
  name: "MainContact",
  components: {
    FieldLabel,
    FieldValue
  },
  data: () => ({
    fieldLabelArr: [],
    fieldValueArr: [],
    commonDataContact: []
  }),
  computed: mapState(["fieldLabel"]),
  watch: {
    fieldLabel() {
      this.initialize();
    }
  },
  methods: {
    initialize() {
      this.fieldLabelArr = this.$store.state.Contact.fieldLabel;
      this.fieldValueArr = this.$store.state.Contact.fieldValue.params;
      this.fieldLabelArr.forEach((fieldLabelItem, fieldLabelIndex) => {
        this.fieldValueArr.forEach((fieldValueItem, fieldValueIndex) => {
          if (fieldLabelIndex === fieldValueIndex) {
            this.commonDataContact.push(
              Object.assign({}, fieldLabelItem, fieldValueItem)
            );
          }
        });
      });
      this.$store.commit("setDataContact", this.commonDataContact);
    }
  },
  created() {
    this.initialize();
  }
};
</script>

<style scoped lang="scss">
.main-contact {
  &__list {
    list-style: none;
    text-align: left;
    margin: 20px 0 0 20px;
  }

  &__list-item {
    padding: 10px;
  }

  &__list-item--field-name {
    color: gray;
    padding: 10px;
  }

  &__list-item--field-value {
    padding: 10px 10px 10px 230px;
  }

  &__add-new-field {
    display: flex;

    &--value {
      margin-left: 100px;
    }
  }
}

input {
  border: 1px solid lightgray;
}
</style>

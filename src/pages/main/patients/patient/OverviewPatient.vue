<template>
  <div class="add-patient">
    <div class="add-patient__title">
      <b-icon
        pack="fas"
        icon="arrow-left"
        size="is-medium"
        @click.native="$router.go(-1)"
      >
      </b-icon>
    </div>
    <section class="add-patient__form">
      <div
        v-for="(field, fieldIndex) in fields"
        :key="fieldIndex"
        class="add-patient__form__field-wrapper"
      >
        <o-field
          class="add-patient__form__field-wrapper__field"
          :label="field.label"
        >
          <o-input
            v-model="field.value"
            :placeholder="field.placeholder"
            :required="field.required"
            disabled="true"
          ></o-input>
        </o-field>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Field } from "@/types/list-patient";
import OInput from "@/components/shared/OInput/OInput.vue";
import OField from "@/components/shared/OField/OField.vue";

@Component({
  components: {
    OInput,
    OField
  }
})
export default class EditPatient extends Vue {
  fields: Field[] = [];

  created() {
    const idPatient = this.$router.history.current.params.id;
    this.fields = JSON.parse(localStorage.getItem("listPatient"))[idPatient];
  }
}
</script>

<style lang="scss" scoped>
.add-patient {
  position: relative;
  width: 500px;
  margin: 0 auto;
  &__title {
    position: absolute;
    left: -70px;
  }
  &__form {
    &__field-wrapper {
      display: flex;
      &__field {
        width: 100%;
      }
    }
    &__new-fields {
      &__wrapper {
        &__new-field {
          display: flex;
          align-items: center;
          &__input {
            width: 100%;
          }
          &__btn-delete {
            padding: 0 40px;
          }
        }
      }
    }
    &__new-field {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border: 1px solid lightgray;
      opacity: 0.6;
      margin: 20px 0;
      cursor: pointer;
      border-radius: 5px;
      &__icon {
        margin: 0 10px 0 20px;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>

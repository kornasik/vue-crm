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
        <b-field
          class="add-patient__form__field-wrapper__field"
          :label="field.label"
        >
          <b-input
            v-model="field.value"
            :placeholder="field.placeholder"
            :required="field.required"
          ></b-input>
        </b-field>
        <b-icon
          v-if="field.type === 'new'"
          pack="fas"
          icon="times"
          type="is-danger"
          @click.native="deleteField(fieldIndex)"
        >
        </b-icon>
      </div>
      <div class="add-patient__form__new-fields__wrapper">
        <div
          class="add-patient__form__new-fields__wrapper__new-field"
          v-for="(newField, newFieldIndex) in newFields"
          :key="newFieldIndex"
        >
          <b-input
            :placeholder="$t('listPatient.labelNewField')"
            class="add-patient__form__new-fields__wrapper__new-field__input"
            @blur="addNewField(newFieldIndex, $event)"
          ></b-input>
          <b-icon
            pack="fas"
            icon="times"
            type="is-danger"
            class="add-patient__form__new-fields__wrapper__new-field__btn-delete"
            @click.native="deleteNewField(newFieldIndex)"
          ></b-icon>
        </div>
      </div>
      <div class="add-patient__form__new-field" @click="createNewField">
        <b-icon
          pack="fas"
          icon="plus-circle"
          size="is-small"
          class="add-patient__form__new-field__icon"
        ></b-icon>
        <div>{{ $t("listPatient.newField") }}</div>
      </div>
      <b-button type="is-success" @click="createNewPatient">
        {{ $t("listPatient.btnCreate") }}
      </b-button>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Field } from "@/types/list-patient";

@Component({})
export default class AddPatient extends Vue {
  newFields: Field[] = [];
  fields: Field[] = [
    {
      label: "Name",
      placeholder: "Nick",
      type: "basic",
      value: "",
      required: true
    },
    {
      label: "Surname",
      placeholder: "Jackbson",
      type: "basic",
      value: "",
      required: true
    },
    {
      label: "Phone number",
      placeholder: "+111111111111",
      type: "basic",
      value: "",
      required: true
    },
    {
      label: "E-mail",
      placeholder: "name@gmail.com",
      type: "basic",
      value: ""
    }
  ];

  createNewPatient() {
    const patient = JSON.parse(JSON.stringify(this.fields)).map(
      (item: Field) => {
        return {
          label: item.label,
          value: item.value
        };
      }
    );
    if (localStorage.getItem("listPatient")) {
      const listPatient = JSON.parse(localStorage.getItem("listPatient"));
      listPatient.push(patient);
      localStorage.setItem("listPatient", JSON.stringify(listPatient));
    } else {
      let listPatient = [];
      listPatient.push(patient);
      localStorage.setItem("listPatient", JSON.stringify(listPatient));
    }
    this.$router.go(-1);
  }

  addNewField(id: number, event: any) {
    this.fields.push({
      label: event.target.value,
      placeholder: `${this.$t("listPatient.valueField")}${event.target.value}`,
      value: "",
      type: "new"
    });
    this.deleteNewField(id);
  }

  createNewField() {
    this.newFields.push({
      label: "",
      placeholder: "",
      value: "",
      type: "new"
    });
  }

  deleteNewField(idField: number) {
    this.newFields.splice(idField, 1);
  }

  deleteField(idField: number) {
    this.fields.splice(idField, 1);
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

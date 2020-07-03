<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container columns">
          <div class="column is-9">
            <b-field
              label="Form name"
              :type="$v.formName.$invalid ? 'is-danger' : 'is-success'"
              :message="
                $v.formName.$invalid ? $t('formBuilder.requiredField') : ''
              "
            >
              <b-input v-model.trim="formName" />
            </b-field>
          </div>
          <div class="column is-3 selectasd">
            <b-select
              v-model="selectedFormType"
              :placeholder="$t('formBuilder.formType')"
            >
              <option value="1">Create patient</option>
              <option value="2">Make visit</option>
              <option value="3">Make annamnesis</option>
            </b-select>
          </div>
          <div class="modal_row">
            <label>
              <b-checkbox v-model="isDefault" />
              <span>{{ $t("formBuilder.makeByDefault") }}</span>
            </label>
          </div>

          <div class="actions">
            <b-button
              class="modal_button"
              type="is-danger"
              outlined
              @click="emitCloseModal"
              >{{ $t("formBuilder.cancel") }}</b-button
            >
            <b-button
              class="modal_button"
              :type="!$v.form.$invalid && $v.form.$dirty ? 'is-success' : ''"
              @click="emitAddForm"
              >{{ $t("formBuilder.create") }}</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  required,
  numeric,
  minValue,
  minLength
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formName: "default name",
      isDefault: false,
      selectedFormType: null
    };
  },
  validations: {
    selectedFormType: {
      required,
      numeric,
      minValue: minValue(1)
    },
    formName: {
      required,
      minLength: minLength(1)
    },
    form: ["formName", "selectedFormType"]
  },
  methods: {
    emitAddForm() {
      this.$v.$touch();
      if (!this.$v.form.$invalid) {
        let newForm = {
          form_type_id: this.selectedFormType,
          name: this.formName,
          isDefault: this.isDefault
        };
        this.$emit("addForm", newForm);
      } else {
        // TODO: change to snackbar
        alert(this.$t("formBuilder.needToCheckFields"));
      }
    },
    emitCloseModal() {
      this.name = "";
      this.isDefault = false;
      this.selectedFormType = null;
      this.$emit("closeModal");
    }
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: flex;
}

.modal-container {
  position: relative;
  max-width: 700px;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.modal_row {
  padding: 0 15px;
}

.modal_button + .modal_button {
  margin-left: 10px;
}

.selectasd {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

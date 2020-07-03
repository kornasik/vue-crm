<template>
  <div class="modal-to-add">
    <b-modal :active.sync="isModalToAdd" :width="640">
      <div :style="{ display: 'flex', padding: '20px' }">
        <b-field label="Label field">
          <b-input v-model="name" :style="{ width: '300px' }" />
        </b-field>
        <b-field label="Simple" :style="{ marginLeft: '10px' }">
          <b-select
            placeholder="Select type"
            v-model="typeField"
            :value="data[0]"
          >
            <option v-for="(option, optionIndex) in data" :key="optionIndex">
              {{ option }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div
        v-if="typeField === 'Выбор' || typeField === 'Радио кнопка'"
        :style="{ display: 'flex', justifyContent: 'space-around' }"
      >
        <div :style="{ width: '50%' }">
          <div :style="{ margin: '0 auto', width: 'fit-content' }">
            <label>
              <b-input v-model="newFieldForSelect" />
            </label>
            <b-button @click="fieldsForSelect.push(newFieldForSelect)"
              >Добавить</b-button
            >
          </div>
        </div>
        <div :style="{ width: '50%', margin: '0 auto' }">
          <ul>
            <li
              :style="{ display: 'flex' }"
              v-for="(item, index) in fieldsForSelect"
              :key="index"
            >
              <input
                type="text"
                :value="item"
                :style="{
                  display: 'block',
                  margin: '0 auto',
                  borderBottom: '1px solid lightgray'
                }"
              />
              <b-icon
                pack="fas"
                icon="times"
                size="is-small"
                type="is-danger"
                :style="{ margin: 'auto' }"
                @click.native="deleteFieldForSelect(index)"
              >
              </b-icon>
            </li>
          </ul>
        </div>
      </div>
      <b-button
        type="is-success"
        :style="{ margin: '0 auto', margin: '15px' }"
        @click="addField"
        >Добавить поле</b-button
      >
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";

@Component({
  props: {
    isModalToAdd: Boolean
  }
})
export default class ModalToAdd extends Vue {
  isModalToAdd: boolean | undefined;
  typeField: string = "";
  name: string = "";
  newFieldForSelect: string = "";
  fieldsForSelect: string[] = [];
  data: string[] = [
    "Текст",
    "Выбор",
    "Чекбокс",
    "Радио кнопка",
    "Текст(большое поле для ввода)"
  ];

  fieldSelect: string[] = [];

  @Watch("isModalToAdd")
  closeModal() {
    if (this.isModalToAdd === false) {
      this.$emit("emitCloseModal");
    }
  }

  deleteFieldForSelect(index: number) {
    this.fieldsForSelect.splice(index, 1);
  }

  spotNumberToType(type: string) {
    switch (type) {
      case "Текст":
        return 2;
      case "Выбор":
        return 3;
      case "Чекбокс":
        return 4;
      case "Радио кнопка":
        return 6;
      case "Текст(большое поле для ввода)":
        return 7;
    }
  }

  addField() {
    api(httpClient).leadFields.add({
      label: this.name || "default",
      name: this.name.toLowerCase() || "default",
      block_id: this.spotNumberToType(this.typeField) || 2,
      default_values: this.fieldsForSelect
    });
    this.$emit("emitAddField");
  }
}
</script>

<style lang="scss" scoped>
.modal-to-add {
  display: flex;
}
</style>

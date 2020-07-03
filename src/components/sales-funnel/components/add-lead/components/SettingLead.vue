<template>
  <div class="setting-lead">
    <div class="setting-lead__header">
      <div class="setting-lead__header__title">
        <b-icon
          pack="fas"
          icon="arrow-left"
          size="is-small"
          class="setting-lead__header__title__button-back"
          @click.native="$router.go(-1)"
        />
        <label>
          <input
            type="text"
            placeholder="Сделка #XXXXXX"
            :style="{
              color: 'white',
              fontSize: '22px',
              fontWeight: 'bold',
              width: '80%'
            }"
          />
        </label>
        <b-icon
          pack="fas"
          icon="ellipsis-h"
          size="is-small"
          type="is-light"
          class="setting-lead__header__title__more"
        />
      </div>
      <div class="setting-lead__header__tags">
        <b-tag
          v-for="(tag, tagIndex) in tags"
          :key="tagIndex"
          :style="{ margin: '0 2px', cursor: 'pointer' }"
          @click.native="deleteTag(tagIndex)"
          >{{ tag }}</b-tag
        >
        <input
          type="text"
          placeholder=" #ТЕГИРОВАТЬ"
          v-model="newTag"
          :style="{ color: 'lightgray', width: '130px' }"
          @blur="addNewTag"
        />
      </div>
      <div class="setting-lead__header__select-lead">
        <div :style="{ color: 'lightgray' }">
          {{ selectEvent.split("/")[1] }}
        </div>
        <select
          placeholder="Select a lead"
          :style="{ width: '100%', fontSize: '20px' }"
          @change="test"
        >
          <optgroup label="Black Sails">
            <option value="flint/Black Sails">Flint</option>
            <option value="silver/Black Sails">Silver</option>
            <option value="vane/Black Sails">Vane</option>
            <option value="billy/Black Sails">Billy</option>
            <option value="jack/Black Sails">Jack</option>
          </optgroup>

          <optgroup label="Breaking Bad">
            <option value="heisenberg/Breaking Bad">Heisenberg</option>
            <option value="jesse/Breaking Bad">Jesse</option>
            <option value="saul/Breaking Bad">Saul</option>
            <option value="mike/Breaking Bad">Mike</option>
          </optgroup>

          <optgroup label="Game of Thrones">
            <option value="tyrion-lannister/Game of Thrones"
              >Tyrion Lannister</option
            >
            <option value="jamie-lannister/Game of Thrones"
              >Jamie Lannister</option
            >
            <option value="daenerys-targaryen/Game of Thrones"
              >Daenerys Targaryen</option
            >
            <option value="jon-snow/Game of Thrones">Jon Snow</option>
          </optgroup>
        </select>
      </div>
      <div :style="{ display: 'flex', flexDirection: 'column' }">
        <b-tabs
          v-model="activeTab"
          :style="{ height: 'calc(100vh - 237px)', color: 'gray' }"
        >
          <b-tab-item label="Основное">
            <div :style="{ display: 'flex', flexDirection: 'column' }">
              <div v-for="(item, index) in listLeadField" :key="index">
                <component
                  :is="item.block"
                  :dataField="item"
                  @emitDeleteField="deleteField"
                  @emitUpdateField="updateField"
                />
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
    <div
      :style="{
        position: 'absolute',
        bottom: '0',
        width: '22.1%',
        borderTop: '1px solid lightgray',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between'
      }"
    >
      <b-button type="is-primary">Сохранить</b-button>
      <b-button type="is-light" @click.native="isModalToAdd = true"
        >Добавить поле</b-button
      >
    </div>
    <ModalToAdd
      :isModalToAdd="isModalToAdd"
      @emitCloseModal="closeModal"
      @emitAddField="addField"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SimpleInput from "@/components/sales-funnel/components/add-lead/elements/SimpleInput.vue";
import SimpleCheckbox from "@/components/sales-funnel/components/add-lead/elements/SimpleCheckbox.vue";
import SimpleRadioButton from "@/components/sales-funnel/components/add-lead/elements/SimpleRadioButton.vue";
import SimpleSelect from "@/components/sales-funnel/components/add-lead/elements/SimpleSelect.vue";
import SimpleTextarea from "@/components/sales-funnel/components/add-lead/elements/SimpleTextarea.vue";
import ModalToAdd from "@/components/sales-funnel/components/add-lead/elements/ModalToAdd.vue";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
@Component({
  components: {
    "simple-input": SimpleInput,
    "simple-select": SimpleSelect,
    "simple-radiobutton": SimpleRadioButton,
    "simple-checkbox": SimpleCheckbox,
    "simple-textarea": SimpleTextarea,
    ModalToAdd
  }
})
export default class SettingLead extends Vue {
  activeTab: number = 0;
  listLeadField: any = [];
  selectEvent: string = "flint/Black Sails";
  tags: string[] = [];
  newTag: string = "";
  isModalToAdd: boolean = false;
  created() {
    this.getListField();
  }

  async getListField() {
    
    await api(httpClient).leadFields.list().then((response: any) => {
      this.listLeadField = response.data.fields;
    });
  }

  test(event: any) {
    this.selectEvent = event.target.value;
  }

  addNewTag() {
    if (this.newTag) {
      this.tags.push(this.newTag);
    }
    this.newTag = "";
  }

  deleteTag(indexTag: string) {
    this.tags.splice(Number(indexTag), 1);
  }

  deleteField() {
    setTimeout(() => {
      this.getListField();
      this.$buefy.notification.open({
        message: "Поле удалено!",
        type: "is-danger"
      });
    }, 500);
  }

  closeModal() {
    this.isModalToAdd = false;
  }

  addField() {
    this.closeModal();
    setTimeout(() => {
      this.getListField();
      this.$buefy.notification.open({
        message: "Поле добавлено!",
        type: "is-success"
      });
    }, 500);
  }

  updateField(){
    this.$buefy.notification.open({
      message: "Поле изменено!",
      type: "is-info"
    });
  }
}
</script>

<style lang="scss" scoped>
.setting-lead {
  &__header {
    width: 100%;
    height: 200px;
    background-color: #203d49;
    padding: 20px 25px 25px 30px;
    position: relative;
    &__title {
      display: flex;
      justify-content: space-between;
      &__button-back {
        position: absolute;
        left: 5px;
        top: 30px;
        color: lightgray;
        cursor: pointer;
      }
      &__more {
        display: block;
      }
    }
    &__tags {
      & button {
        padding: 3px;
        color: lightgray;
        border-radius: 3px;
        font-size: 10px;
        border: 1px solid lightgray;
        height: 26px;
      }
    }
    &__select-lead {
      margin: 16px 0 4px 0;
      width: 100%;
    }
  }
}

input {
  outline: none;
  width: 375px;
}
</style>

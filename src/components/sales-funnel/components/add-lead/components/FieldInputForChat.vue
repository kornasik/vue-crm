<template>
  <section class="field-input-for-chats">
    <span>
      Введите сообщения для
      <select v-model="forWhomMassages">
        <option value="asd1">asd1</option>
        <option value="asd2">asd2</option>
        <option value="asd3">asd3</option>
        <option value="asd4">asd4</option>
      </select>
      :
      <input type="text" v-model="massageValue" />
    </span>
    <div class="field-input-for-chats__actions">
      <div class="field-input-for-chats__actions__buttons">
        <b-button type="is-primary" @click.native="addMassage">
          Отправить
        </b-button>
      </div>
      <input type="file" id="file" />

      <label for="file">
        <b-icon pack="fas" icon="paperclip"></b-icon>Choose a file
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class FieldInputForChat extends Vue {
  massageValue: string = "";
  forWhomMassages: string = "asd1";
  addMassage() {
    if (this.massageValue) {
      this.$emit("emitAddMassage", {
        noteValue: this.massageValue,
        type: "massage",
        createDate: new Date(),
        forWhomMassages: this.forWhomMassages
      });
      this.massageValue = "";
    }
  }
}
</script>

<style lang="scss" scoped>
.field-input-for-chats {
  &__actions {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 95%;
    top: 70px;
    &__buttons {
      width: 215px;
      display: flex;
      justify-content: space-between;
    }
  }
}
textarea {
  width: 100%;
  height: 80px;
  resize: none;
  outline: none;
}

input[type="file"] {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

input[type="text"] {
  width: 500px;
  outline: none;
}

select {
  outline: none;
  border-bottom: 1px solid blue;
}
</style>

<template>
  <section class="field-input-for-chats">
    <textarea placeholder="Введите текст примечания:" v-model="noteValue" />
    <div class="field-input-for-chats__actions">
      <div class="field-input-for-chats__actions__buttons">
        <b-button type="is-primary" @click.native="addNote">Добавить</b-button>
      </div>
      <input type="file" id="file" />

      <label for="file">
        <b-icon pack="fas" icon="paperclip" />
        Choose a file
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class FieldInputForNote extends Vue {
  noteValue: string = "";

  addNote() {
    if (this.noteValue) {
      this.$emit("emitAddNote", {
        noteValue: this.noteValue,
        type: "note",
        createDate: new Date()
      });
      this.noteValue = "";
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
</style>

<template>
  <div class="view-note-wrapper">
    <template v-if="note.type === 'note'">
      <div class="view-note">
        <b-icon pack="fas" icon="clipboard-list" size="is-medium"> </b-icon>
        <div class="view-note__date-and-value">
          <span class="view-note__date-and-value__date">
            {{ dateNote }} {{ timeNote }}
          </span>
          <input
            type="text"
            class="view-note__date-and-value__value data_and_value"
            v-model="noteValue"
            @blur="changeNoteValue"
          />
        </div>
        <div class="view-note__actions">
          <b-button
            type="is-text"
            size="is-small"
            @click.native="editNoteValue"
            outlined
          >
            <b-icon pack="fas" icon="edit" size="is-small"> </b-icon>
            <span>Изменить</span>
          </b-button>
          <b-button
            type="is-danger"
            size="is-small"
            @click.native="deleteNote"
            outlined
          >
            <b-icon pack="fas" icon="trash" size="is-small"> </b-icon>
            <span>Удалить</span>
          </b-button>
        </div>
      </div>
    </template>
    <template v-if="note.type === 'massage'">
      <div class="view-massage">
        <b-icon pack="fas" icon="smile" size="is-medium"> </b-icon>
        <div class="view-massage__date-and-value">
          <span class="view-massage__date-and-value__date">
            {{ dateNote }} {{ timeNote }} От: OHIS Мария Шабанова кому:
            {{ note.forWhomMassages }}
          </span>
          <input
            type="text"
            class="view-massage__date-and-value__value data_and_value"
            v-model="noteValue"
            disabled
          />
        </div>
      </div>
    </template>
    <template v-if="note.type === 'task'">
      <div class="view-task">
        <b-icon
          pack="far"
          icon="check-circle"
          size="is-medium"
          type="is-success"
        >
        </b-icon>
        <div class="view-task__date-and-value">
          <span class="view-task__date-and-value__date">
            {{ note.time }} для {{ note.user }}
          </span>
          <div :style="{ textDecoration: 'line-through' }">
            {{ note.taskAssignment }}
            <span v-if="note.result">:</span>
            {{ note.result }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  props: {
    note: Object
  }
})
export default class ViewNote extends Vue {
  note: any;
  noteValue: string = this.note.noteValue;

  get dateNote() {
    let dateCreated =
      this.note.createDate.getDate() +
      "." +
      String(Number(this.note.createDate.getMonth()) + 1) +
      "." +
      this.note.createDate.getFullYear();

    return dateCreated
      .split(".")
      .map((item: string) => {
        if (Number(item) < 10) {
          return "0" + item;
        }
        return item;
      })
      .join(".");
  }

  get timeNote() {
    let timeCreated =
      this.note.createDate.getHours() + ":" + this.note.createDate.getMinutes();
    return timeCreated
      .split(":")
      .map((item: string) => {
        if (Number(item) < 10) {
          return "0" + item;
        }
        return item;
      })
      .join(":");
  }

  changeNoteValue() {
    this.$emit("emitChangeNoteValue", {
      id: this.note.id,
      value: this.noteValue
    });
  }

  editNoteValue() {
    (document.querySelectorAll(".data_and_value")[this.note.id - 1] as any).focus();
  }

  deleteNote() {
    this.$emit("emitDeleteNote", this.note.id);
  }
}
</script>

<style lang="scss" scoped>
.view-note {
  display: flex;
  background-color: white;
  margin: 14px;
  padding: 15px;
  border: 1px solid lightgray;
  &__date-and-value {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0 10px;
    &__date {
      font-size: 12px;
      color: gray;
    }
    &__value {
      font-size: 14px;
    }
  }
  &__actions {
    display: flex;
    width: 280px;
    justify-content: space-around;
  }
}

.view-massage {
  display: flex;
  margin: 14px;
  padding: 15px;
  &__date-and-value {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0 10px;
    &__date {
      font-size: 12px;
      color: gray;
    }
    &__value {
      font-size: 14px;
    }
  }
  &__actions {
    display: flex;
    width: 280px;
    justify-content: space-around;
  }
}

.view-task {
  display: flex;
  margin: 14px;
  padding: 15px;
  background-color: white;
  border: 1px solid lightgray;
  &__date-and-value {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0 10px;
    &__date {
      font-size: 12px;
      color: gray;
    }
    &__value {
      font-size: 14px;
    }
  }
  &__actions {
    display: flex;
    width: 280px;
    justify-content: space-around;
  }
}
</style>

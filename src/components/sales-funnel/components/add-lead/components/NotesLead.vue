<template>
  <div class="notes-lead">
    <div class="notes-lead__view-note-wrapper">
      <div v-for="(note, noteIndex) in notesList" :key="noteIndex">
        <ViewNote
          :note="note"
          :key="noteIndex + note.noteValue"
          @emitDeleteNote="deleteNote"
          @emitChangeNoteValue="changeNoteValue"
        />
      </div>
    </div>
    <div class="notes-lead__create-block-wrapper">
      <div
        class="notes-lead__create-block-wrapper__tasks-list"
        v-if="isOpenTaskList"
      >
        <div
          v-if="tasks.length < 1"
          :style="{ textAlign: 'center', fontSize: '22px' }"
        >
          Список задач пуст. Создайте новую задачу.
        </div>
        <div
          class="notes-lead__create-block-wrapper__tasks-list__block"
          v-for="(task, taskIndex) in tasks"
          :key="taskIndex"
        >
          <Task
            :task="task"
            :numberTask="taskIndex"
            @emitOpenModalTask="openModalTask"
          />
          <TaskEdit
            :numberTask="taskIndex"
            :isOpenModalForEditTask="isOpenModalForEditTask"
            @emitTaskComplete="taskComplete"
          />
        </div>
      </div>
      <span
        class="notes-lead__create-block-wrapper__tasks-list__block__task__handler"
        @click="isOpenTaskList = !isOpenTaskList"
      />
      <div class="notes-lead__create-block-wrapper__create-note-block">
        <div
          class="notes-lead__create-block-wrapper__create-note-block__create-note"
          :style="{ border: '1px solid lightgray' }"
        >
          <section :style="{ position: 'relative' }">
            <b-tabs size="is-small" class="block">
              <b-tab-item label="Чат">
                <FieldInputForChat @emitAddMassage="addMassage" />
              </b-tab-item>
              <b-tab-item label="Примечания">
                <FieldInputForNote @emitAddNote="addNote" />
              </b-tab-item>
              <b-tab-item label="Задача">
                <CreateTaskForLead @emitCreateTask="createTask" />
              </b-tab-item>
            </b-tabs>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FieldInputForChat from "@/components/sales-funnel/components/add-lead/components/FieldInputForChat.vue";
import FieldInputForNote from "@/components/sales-funnel/components/add-lead/components/FieldInputForNote.vue";
import CreateTaskForLead from "@/components/sales-funnel/components/add-lead/components/CreateTaskForLead.vue";
import ViewNote from "@/components/sales-funnel/components/add-lead/components/ViewNote.vue";
import Task from "@/components/sales-funnel/components/add-lead/components/Task.vue";
import TaskEdit from "@/components/sales-funnel/components/add-lead/components/TaskEdit.vue";

@Component({
  components: {
    FieldInputForChat,
    FieldInputForNote,
    CreateTaskForLead,
    ViewNote,
    Task,
    TaskEdit
  }
})
export default class NotesLead extends Vue {
  notesList: object[] = [];
  isOpenTaskList: boolean = false;
  isOpenModalForEditTask: any = {};

  tasks: object[] = [
    {
      description: "asd",
      time: "04.02.2020",
      user: "OHIS Mariy Scherbakova",
      taskAssignment: "Связаться"
    }
  ];

  openModalTask(isOpenModalForEditTask: any) {
    this.isOpenModalForEditTask = isOpenModalForEditTask;
  }

  deleteNote(id: number) {
    this.notesList.splice(id - 1, 1);
    this.notesList.forEach((item: any, index) => {
      item.id = index + 1;
    });
  }

  changeNoteValue(idAndValue: any) {
    this.notesList.forEach((item: any) => {
      if (item.id === idAndValue.id) {
        item.noteValue = idAndValue.value;
      }
    });
    this.$buefy.notification.open({
      message: "Запись изменена",
      type: "is-success"
    });
  }

  addNote(newNote: any) {
    console.log(newNote);
    newNote.id = this.notesList.length + 1;
    this.notesList.push(newNote);
  }

  addMassage(newMassage: any) {
    newMassage.id = this.notesList.length + 1;
    this.notesList.push(newMassage);
  }

  created() {
    this.notesList = [];
  }

  createTask(task: any) {
    this.tasks.push(task);
  }

  taskComplete(dataTask: any) {
    this.notesList.push(
      Object.assign(
        {},
        this.tasks[dataTask.numberTask],
        { type: "task" },
        { result: dataTask.result }
      )
    );
    this.tasks.splice(dataTask.numberTask, 1);
  }
}
</script>

<style lang="scss" scoped>
.notes-lead {
  &__view-note-wrapper {
    height: 80vh;
    width: 100%;
    background-color: #f5f5f5;
    overflow: overlay;
    border-bottom: 1px solid lightgray;
  }

  &__create-block-wrapper {
    position: relative;
    height: 20vh;
    min-height: 187px;
    max-height: 220px;
    width: 100%;
    background-color: #f5f5f5;

    &__tasks-list {
      position: absolute;
      bottom: 200px;
      width: calc(100% - 40px);
      border: 1px solid lightgray;
      margin: 20px;
      min-height: 30px;
      border-radius: 4px;
      background-color: lightblue;

      &__block {
        &__task__handler {
          content: "";
          position: absolute;
          left: 50%;
          top: -6px;
          border: 10px solid transparent;
          border-bottom: 10px solid lightgray;

          &:hover {
            border-bottom: 10px solid gray;
          }
        }
      }
    }

    &__create-note-block {
      width: 100%;
      height: 100%;
      padding: 20px;
      &__create-note {
        width: 100%;
        height: 100%;
        border: 1px solid lightgray;
        border-radius: 3px;
        background-color: white;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}
</style>

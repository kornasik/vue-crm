<template>
  <div class="task-list__block__task" @click="openModalTask">
    <div :style="{ display: 'flex', marginRight: 'auto' }">
      <b-icon pack="far" icon="clock" size="is-small"></b-icon>
      <div class="task-list__block__task__time">
        {{ task.time }}
      </div>
      <div class="task-list__block__task__for">
        для
      </div>
      <div class="task-list__block__task__user">
        {{ task.user }}
      </div>
      <div class="task-list__block__task__assignment">
        {{ task.taskAssignment }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    task: Object,
    numberTask: Number
  }
})
export default class TaskList extends Vue {
  task: any;
  isOpenModalForEditTask: boolean = false;
  numberTask: number = 0;

  openModalTask() {
    this.isOpenModalForEditTask = !this.isOpenModalForEditTask;
    this.$emit("emitOpenModalTask", {
      flag: this.isOpenModalForEditTask,
      number: this.numberTask
    });
  }
}
</script>

<style lang="scss" scoped>
.task-list__block__task {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4px 10px;
  font-size: 12px;
  color: gray;
  cursor: pointer;

  &__time {
    padding: 0 5px;
  }

  &__assignment {
    font-size: 12px;
    font-weight: bold;
    color: black;
    padding: 0 5px;
  }

  &__user {
    padding: 0 5px;
  }

  &__edit-block {
    width: 100%;
  }
}
</style>

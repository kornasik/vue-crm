<template>
  <div class="schedule">
    <div class="schedule__doctor-list">
      <ListDoctors />
    </div>
    <div class="schedule__wrapper">
      <div class="schedule__shift-work">
        <Checkbox checkboxLabel="Сменный график" />
      </div>
      <div
        v-if="this.$store.state.Schedule.shiftWork"
        class="schedule__create-schedule"
      >
        <TableCreateRecord :edit="edit" />
      </div>
      <div v-else class="schedule__create-schedule">
        <CreateRecord :edit="!edit" />
      </div>
    </div>
  </div>
</template>

<script>
import ListDoctors from "./components/ListDoctors";
import CreateRecord from "./components/CreateRecord";
import TableCreateRecord from "./components/TabCreateRecord";
import Checkbox from "./elements/Checkbox";

export default {
  components: {
    ListDoctors,
    CreateRecord,
    TableCreateRecord,
    Checkbox
  },
  props: {
    edit: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  beforeCreate() {
    this.$axios
      .get(this.$store.state.apiDomain + "/medicine/schedule/list", {
        params: {
          doctor_id: 1,
          mode: "daily"
        }
      })
      .then(response => {
        if (!(response.data.schedule === null)) {
          this.$store.commit("setDataDoctor", response.data.schedule[0]);
          this.$store.commit("changeStatusSchedule", "edit");
        } else {
          this.$store.commit("cleanDataDoctor");
        }
      });
  }
};
</script>

<style scoped lang="scss">
.schedule {
  display: flex;
  max-width: 1150px;
  margin: 0 auto;

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0 auto;
  }
}
</style>

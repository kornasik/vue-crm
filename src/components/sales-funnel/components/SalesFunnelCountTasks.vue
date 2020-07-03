<template>
  <div class="sales-funnel__count-tasks">
    <div class="today-tasks tasks">
      Задач на сегодня:
      <div class="today-tasks-count task-count">
        {{ this.$store.state.SalesFunnel.todayTasks }}
      </div>
    </div>
    <div class="not-tasks tasks">
      Без задач:
      <div class="not-tasks-count task-count">
        {{ this.$store.state.SalesFunnel.todayTasks }}
      </div>
    </div>
    <div class="pastdue-tasks tasks">
      Просроченных:
      <div class="pastdue-tasks-count task-count">
        {{ this.$store.state.SalesFunnel.todayTasks }}
      </div>
    </div>
    <div class="new-tasks tasks">
      Новых сегодня/вчера:
      <div class="new-tasks-count task-count">
        {{ this.$store.state.SalesFunnel.newTodayTasksCount }}/{{
          this.$store.state.SalesFunnel.newYesterdayTasksCount
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountTasks"
};
</script>

<style scoped lang="scss">
.sales-funnel {
  &__count-tasks {
    display: flex;
    justify-content: space-evenly;
  }
}

.task-count {
  color: #949fb0;
  font-size: 20px;
}
</style>

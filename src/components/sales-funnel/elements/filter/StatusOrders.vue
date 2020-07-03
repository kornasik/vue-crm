<template>
  <div class="sales-funnel__filter-status-wrapper">
    <div>
      <div
        class="sales-funnel__filter-statuses-orders"
        :class="{ activeStatus: selectedStatusOrders === status }"
        v-for="status in statusOrders"
        :key="status"
        @click="emitSelectedStatus(status)"
      >
        {{ status }}
      </div>
    </div>
    <div class="actions-filter">
      <b-button
        type="is-danger"
        outlined
        @click="$store.commit('clearFilterTag')"
      >
        Сбросить
      </b-button>
      <b-button type="is-link" outlined>
        Применить
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusOrders",
  props: {
    statusOrders: {
      type: Array,
      default: () => [
        "Открытые сделки",
        "Только мои сделки",
        "Успешно завершёные",
        "Нереализованные сделаки",
        "Сделки без задач",
        "Сделки с просроченными задачами"
      ]
    }
  },
  data: () => ({
    selectedStatusOrders: "Открытые сделки"
  }),
  methods: {
    emitSelectedStatus(status) {
      this.$store.commit("setFilterTag", status);
      this.selectedStatusOrders = status;
      this.$emit("selectedStatus", status);
    }
  }
};
</script>

<style scoped lang="scss">
.sales-funnel {
  &__filter-status-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 260px;
    border-right: 1px solid lightgray;
    height: 100%;
  }

  &__filter-statuses-orders {
    max-width: 300px;
    text-align: left;
    padding: 15px;
    margin: 0 20px;
    border-bottom: 1px solid lightgray;
    cursor: pointer;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
  }
}

.actions-filter {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.activeStatus {
  color: #1b94d7;
  font-weight: bold;
}
</style>

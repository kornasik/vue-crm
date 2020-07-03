<template>
  <div
    v-if="this.$store.state.SalesFunnel.isOpenFilter"
    class="sales-funnel__filter"
  >
    <StatusOrders
      :statusOrders="statusOrders"
      @selectedStatus="eventSelectedStatus"
    />
    <div class="properties-and-tag-wrapper">
      <PropertiesOrders />
      <TagOrders />
    </div>
    <span class="close-filter" @click="$store.commit('closeFilter')" />
  </div>
</template>

<script>
import StatusOrders from "../elements/filter/StatusOrders";
import PropertiesOrders from "../elements/filter/PropertiesOrders";
import TagOrders from "../elements/filter/TagOrders";

export default {
  name: "status-filter",
  components: {
    TagOrders,
    PropertiesOrders,
    StatusOrders
  },
  data: () => ({
    statusOrders: [
      "Открытые сделки",
      "Только мои сделки",
      "Успешно завершёные",
      "Нереализованные сделаки",
      "Сделки без задач",
      "Сделки с просроченными задачами"
    ],
    selectedStatusOrders: ""
  }),
  methods: {
    eventSelectedStatus(status) {
      this.selectedStatusOrders = status;
    }
  }
};
</script>

<style lang="scss" scoped>
.sales-funnel {
  &__filter {
    position: absolute;
    width: 99.8%;
    height: 70vh;
    z-index: 2;
    margin-top: 40px;
    background-color: white;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.75);
    left: 0.3px;
    display: flex;
  }
}

.properties-and-tag-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-y: auto;
  width: 100%;
  background-color: #fbfbfb;
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

.close-filter {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close-filter:hover {
  opacity: 1;
}
.close-filter:before,
.close-filter:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 22px;
  width: 2px;
  background-color: #333;
}
.close-filter:before {
  transform: rotate(45deg);
}
.close-filter:after {
  transform: rotate(-45deg);
}
</style>

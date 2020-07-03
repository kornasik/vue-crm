<template>
  <div :style="{ display: 'flex', position: 'relative', width: '100vw' }">
    <div class="sales-funnel-header__search-panel">
      <div
        class="sales-funnel-header__filter-tag-wrapper"
        v-if="$store.state.SalesFunnel.filterTag"
      >
        <div
          class="sales-funnel-header__filter-status filter-status"
          v-if="$store.state.SalesFunnel.filterTag.status"
        >
          {{ this.$store.state.SalesFunnel.filterTag.status }}
        </div>
        <span
          v-if="$store.state.SalesFunnel.filterTag.tags.length > 0"
          :style="{ padding: '8px 0 8px 8px' }"
          >Теги:</span
        >
        <div
          class="sales-funnel-header__filter-tag-item filter-tag"
          v-for="(item, index) in this.$store.state.SalesFunnel.filterTag.tags"
          :key="index"
          @click="$store.commit('deleteItemFilterTag', index)"
        >
          {{ item }}
        </div>
      </div>
      <b-icon
        pack="fas"
        icon="search"
        class="sales-funnel-header__search-icon"
        size="is-small"
        v-if="!$store.state.SalesFunnel.filterTag.status"
      />
      <input
        type="text"
        placeholder="Поиск и фильтр"
        class="sales-funnel-header__search-field"
        @click="$store.commit('openFilter')"
      />
      <SalesFunnelFilter />
    </div>
    <CountOrders />
  </div>
</template>

<script>
import CountOrders from "../elements/CountOrders";
import SalesFunnelFilter from "./SalesFunnelFilter";

export default {
  name: "SearchPanel",
  components: {
    CountOrders,
    SalesFunnelFilter
  }
};
</script>

<style scoped lang="scss">
.sales-funnel-header {
  display: flex;
  margin: 0 0 20px 0;
  padding: 0;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid lightgray;

  &__search-panel {
    display: flex;
    border-left: 1px solid lightgray;
    width: 50%;
    padding-left: 10px;
  }

  &__search-field {
    min-width: 400px;
  }

  &__search-field:focus {
    outline: none;
  }

  &__search-icon {
    margin: auto 10px auto 0;
  }

  &__filter-tag-wrapper {
    display: flex;
  }

  &__filter-tag-item {
    cursor: pointer;
  }
}

.filter-tag {
  display: flex;
  padding: 0 5px;
  margin: auto 5px;
  height: 65%;
  background-color: #dfebf8;
  border: 1px solid #9dc1e7;
  border-radius: 2px;
}

.filter-tag:after {
  content: "✖";
  color: red;
  margin-top: 4px;
  margin-left: 5px;
  font-size: 12px;
}

.filter-status {
  display: flex;
  padding: 0 5px;
  margin: auto 5px;
  height: 65%;
  background-color: #cfe3a7;
  border: 1px solid #a2c45f;
  border-radius: 2px;
  width: max-content;
}
</style>

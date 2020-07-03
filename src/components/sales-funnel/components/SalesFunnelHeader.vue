<template>
  <div class="sales-funnel-header__wrapper">
    <div class="sales-funnel-header">
      <div class="sales-funnel-header__position">
        <span class="sales-funnel-header__title text-left">Воронка</span>
        <b-icon
          pack="fas"
          icon="columns"
          class="sales-funnel-header__position-vertical position"
          :class="{ 'active-position': position }"
          @click.native.stop="activePositionVertical"
        />
        <b-icon
          pack="fas"
          icon="list"
          class="sales-funnel-header__position-horizontal position"
          :class="{ 'active-position': !position }"
          @click.native.stop="activePositionHorizontal"
        />
      </div>
      <SearchPanel />
      <More />
      <Settings :name="name" />
    </div>
    <CountTasks />
  </div>
</template>

<script>
import CountTasks from "./SalesFunnelCountTasks";
import SearchPanel from "./SalesFunnelSearchPanel";
import More from "../elements/More";
import Settings from "../elements/Settings";

export default {
  name: "SalesFunnelHeader",
  components: {
    CountTasks,
    SearchPanel,
    More,
    Settings
  },
  props: {
    name: String
  },
  data: () => ({
    position: true
  }),
  methods: {
    activePositionVertical() {
      this.position = true;
    },
    activePositionHorizontal() {
      this.position = false;
    }
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

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__position {
    display: flex;
    align-items: center;
  }

  &__title {
    margin: 20px;
    text-transform: uppercase;
    font-weight: bold;
  }

  &__filter-tag-item {
    cursor: pointer;
  }
}

.position {
  margin-right: 20px;
  opacity: 0.3;
  color: black;
  cursor: pointer;
}

.position:hover {
  cursor: pointer;
}

.active-position {
  color: #3c62a3;
  opacity: 1;
}
</style>

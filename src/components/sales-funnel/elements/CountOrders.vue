<template>
  <div class="sales-funnel-header__count-orders">
    <div class="sales-funnel-header__count">
      {{ this.$store.state.SalesFunnel.countOrders }} сделки:
    </div>
    <div class="sales-funnel-header__total">
      {{ this.$store.state.SalesFunnel.totalSumOrders }} руб
    </div>
  </div>
</template>

<script>
export default {
  name: "CountOrders"
};
</script>

<style scoped lang="scss">
.sales-funnel-header {
  &__count-orders {
    display: flex;
    margin-left: auto;
    border-right: 1px solid lightgray;
    padding-right: 20px;
    align-items: center;
  }
  &__count {
    color: lightgray;
    margin-right: 5px;
  }
}
</style>

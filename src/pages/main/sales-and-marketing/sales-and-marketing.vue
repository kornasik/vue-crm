<template>
  <div>
    <SalesFunnelList />
    <b-button
      type="is-primary"
      @click="$router.push('sales-and-marketing/payment-management')"
    >
      {{ $t("paymentManagement.buttonRedirectOnPage") }}
    </b-button>
    <b-button
      type="is-primary"
      @click="$router.push('sales-and-marketing/lead-analytics')"
    >
      {{ $t("leadAnalytics.analytics") }}
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SalesFunnelList from "@/components/sales-funnel/components/SalesFunnelList.vue";

@Component({
  components: {
    SalesFunnelList
  }
})
export default class SaleAndMarketing extends Vue {}
</script>

<style lang="scss" scoped></style>

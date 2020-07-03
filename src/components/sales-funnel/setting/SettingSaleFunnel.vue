<template>
  <div class="sale-funnel__setting">
    <SourceDeals />
    <SettingSaleFunnelRightPart />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SourceDeals from "../setting/components/SourceDeals.vue";
import SettingSaleFunnelRightPart from "./components/SettingSaleFunnelRightPart.vue";
import { Getter, Mutation } from "vuex-class";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
@Component({
  components: {
    SourceDeals,
    SettingSaleFunnelRightPart
  }
})
export default class SettingSaleFunnel extends Vue {
  @Getter("getIdSalesFunnel") getIdSalesFunnel: any;

  @Mutation("setListEditStageFunnel") setListEditStageFunnel: any;

  created() {
    api(httpClient)
      .funnelStage.listStageFunnelByFunnelId(this.getIdSalesFunnel)
      .then((response: any) => this.setListEditStageFunnel(response.data.stages));
  }
}
</script>

<style lang="scss" scoped>
.sale-funnel {
  &__setting {
    display: flex;
  }
}
</style>

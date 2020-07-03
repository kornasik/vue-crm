<template>
  <div class="setting-stage-funnel-main">
    <div
      v-if="listEditStageFunnel === null || listEditStageFunnel.length < 1"
      class="setting-stage-funnel-main__add-first-stage"
      @click="addFirstStage"
    >
      <span>
        <b-icon pack="fas" icon="plus-circle" size="is-large" type="is-white" />
      </span>
    </div>
    <div
      class="setting-stage-funnel-main__item"
      v-for="(item, index) in listEditStageFunnel"
      :key="index"
    >
      <SettingStageFunnel
        :nameStageFunnel="item.name"
        :indexStageFunnel="index"
        :salesFunnelId="item.sales_funnel_id"
        :idStageFunnel="item.id"
        :positionStageFunnel="item.position"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SettingStageFunnel from "../elements/SettingStageFunnel.vue";
import { Getter, Mutation } from "vuex-class";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
@Component({
  components: {
    SettingStageFunnel
  }
})
export default class SettingSaleFunnelMain extends Vue {
  @Getter("getListEditStageFunnel") listEditStageFunnel: any;
  @Getter("getIdSalesFunnel") getIdSalesFunnel: any;

  @Mutation("setListEditStageFunnel") setListEditStageFunnel: any;
  @Mutation("setStagesFunnel") setStagesFunnel: any;

  addFirstStage() {
    api(httpClient)
      .funnelStage.add({
        name: "new stage",
        sales_funnel_id: this.getIdSalesFunnel
      })
      .then(() => {
        api(httpClient)
          .funnelStage.listStageFunnelByFunnelId(this.getIdSalesFunnel)
          .then((response: any) => {
            this.setListEditStageFunnel(response.data.stages);
            this.setStagesFunnel(response.data.stages);
          });
      });
  }
}
</script>

<style scoped lang="scss">
.setting-stage-funnel-main {
  display: flex;
  position: relative;
  &__add-first-stage {
    width: 300px;
    height: calc(100vh - 54px);
    background-color: rgba(0, 12, 255, 0.2);
    border: 3px dashed rgba(0, 12, 255, 0.5);
  }

  &__add-first-stage span {
    position: absolute;
    top: calc(50% - 12px);
    left: 63px;
  }

  &__add-first-stage:hover {
    cursor: pointer;
    background-color: rgba(0, 12, 255, 0.3);
    border: 5px dashed rgba(0, 12, 255, 0.6);
  }
}
</style>

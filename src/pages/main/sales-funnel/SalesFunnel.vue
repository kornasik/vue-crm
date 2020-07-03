<template>
  <div :style="{ maxWidth: '1400px', margin: '0 auto' }">
    <div class="container is-fluid">
      <SalesFunnelHeader :name="nameSalesFunnel" />
      <div>
        <div
          v-for="n in 1"
          :key="n"
          :style="{ cursor: 'grab' }"
          @mousedown="$event.target.style.cursor = 'grabbing'"
          @mouseup="$event.target.style.cursor = 'grab'"
        >
          <div class="container">
            <div class="columns">
              <StageFunnel
                v-for="(stage, stageIndex) in stagesFunnel"
                :item="stage"
                :key="stageIndex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SalesFunnelHeader from "../../../components/sales-funnel/components/SalesFunnelHeader.vue";
import StageFunnel from "../../../components/sales-funnel/components/StageFunnel.vue";
import { Getter, Mutation, Action } from "vuex-class";
import router from "@/router";
import api from "@/api/index.api";
import httpClient from '../../../api/httpClient/httpClient';
@Component({
  components: {
    SalesFunnelHeader,
    StageFunnel
  }
})
export default class SalesFunnel extends Vue {
  @Getter("getStagesFunnel") stagesFunnel: any;

  @Mutation("setIdSalesFunnel") setIdSalesFunnel: any;
  @Mutation("setStagesFunnel") setStagesFunnel: any;

  list: any = [];
  nameSalesFunnel: string = "";
  isLoading: boolean = true;

  created() {
    this.initialList();
    this.nameSalesFunnel = router.currentRoute.params.id;
  }

  initialList() {
    api(httpClient).salesFunnel.list().then((response: any) => {
        this.list = response.data.sales_funnel;
      })
      .then(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.v-card + .v-card {
  margin-top: 15px;
}

.card-custom:hover {
  cursor: pointer;
}

.card-custom:active {
  cursor: grabbing;
}

.h-max {
  height: 300px;
}

.sortable-ghost {
  background: #f7f7f7;
}

.fast-add {
  background-color: #f4f5f7;
  text-align: center;
  width: 100%;
  border: 0.5px dotted lightgray;
  border-radius: 4px;
  text-transform: uppercase;
}

.column {
  cursor: default;
}
</style>

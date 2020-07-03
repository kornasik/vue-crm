<template>
  <div class="column stage-funnel">
    <h5 class="bg_block-gray title-stage-funnel">{{ item.name }}</h5>
    <!--<button class="bg_block-gray fast-add" @click="dialog=true">Быстрое добавление</button>-->
    <draggable class="bg_block-gray" group="stageFunnel">
      <SalesFunnelCard
        :lead="leadItem"
        v-for="(leadItem, leadIndex) in leadList"
        :key="leadIndex"
      />
    </draggable>
    <b-loading
      :active.sync="isLoading"
      :can-cancel="true"
      class="loading-background"
      :is-full-page="false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import draggable from "vuedraggable";
import SalesFunnelCard from "./SalesFunnelCard.vue";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
@Component({
  props: {
    item: Object
  },
  components: {
    draggable,
    SalesFunnelCard
  }
})
export default class StageFunnel extends Vue {
  leadList: any = [];
  isLoading: boolean = true;

  created() {
    api(httpClient).salesFunnel.list()
      .then((response: any) => {
        this.leadList = response.data.leads;
      })
      .then(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style scoped lang="scss">
.stage-funnel {
  max-width: 350px;
}

.title-stage-funnel {
  text-transform: uppercase;
  font-weight: bold;
}

.bg_block-gray {
  border-radius: 0 0 4px 4px;
  background: #f4f5f7;
  padding: 20px;
  margin: 0;
  text-align: center;
}

.loading-background {
  background-color: rgb(229, 229, 229);
}
</style>

<template>
  <div class="sales-funnel-list">
    <b-menu>
      <b-menu-list label="Sales Funnel List">
        <ItemMenuSalesFunnelList
          v-for="(item, index) in list"
          :key="index"
          :item="item"
          @emitEditSaleFunnel="editSaleFunnel"
          @emitDeleteSaleFunnel="deleteSaleFunnel"
        />
      </b-menu-list>
    </b-menu>
    <div class="sales-funnel__add-sales-funnel">
      <b-field label="Добавить воронку">
        <b-input v-model="nameSalesFunnel" />
      </b-field>
      <b-button
        type="is-success"
        :style="{ margin: 'auto 0 0.75rem 5px' }"
        @click="addSaleFunnel"
      >
        <b-icon pack="fas" icon="check" size="is-small" />
      </b-button>
    </div>
    <b-loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="false"
      class="loading-background"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation, Action } from "vuex-class";
import ItemMenuSalesFunnelList from "../../sales-funnel/elements/ItemMenuSalesFunnelList.vue";

import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
@Component({
  components: {
    ItemMenuSalesFunnelList
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
  }

  initialList() {
    api(httpClient)
      .salesFunnel.list()
      .then((response: any) => {
        this.list = response.data.sales_funnel;
      })
      .then(() => (this.isLoading = false))
      .catch(() => {
        this.$buefy.snackbar.open(`Пустой список воронок`);
      });
  }

  addSaleFunnel() {
    api(httpClient).salesFunnel.addList({
      name: this.nameSalesFunnel,
      enable: 1
    });
    this.initialList();
  }

  editSaleFunnel(idNameSaleFunnel: any) {
    api(httpClient)
      .salesFunnel.update(idNameSaleFunnel)
      .then(() => this.initialList())
      .then(() => this.$buefy.snackbar.open(`Запись изменена`))
      .catch(() => this.$buefy.snackbar.open(`Запись не изменена`));
  }

  deleteSaleFunnel(id: number) {
    api(httpClient)
      .salesFunnel.delete(id)
      .then(() => this.initialList())
      .then(() => this.$buefy.snackbar.open(`Запись удалена`))
      .catch(() => this.$buefy.snackbar.open(`Запись не удалена`));
  }
}
</script>

<style lang="scss" scoped>
.sales-funnel-list {
  width: 200px;
  margin: 20px 0 0 20px;
}

.sales-funnel__add-sales-funnel {
  display: flex;
  width: 230px;
}

.sales-funnel__add-sales-funnel {
  display: flex;
  width: 230px;
}

.loading-background {
  background-color: rgba(229, 229, 229, 0.9);
}
</style>

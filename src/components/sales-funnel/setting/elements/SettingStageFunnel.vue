<template>
  <div class="edit-stage-funnel box-crew">
    <div class="edit-stage-funnel__header-stage">
      <div class="edit-stage-funnel__move-left">
        <b-icon
          pack="fas"
          icon="arrow-left"
          size="is-small"
          type="is-white"
          @click.native="moveLeftStage"
          v-if="indexStageFunnel > 0"
        />
      </div>
      <input
        class="edit-stage-funnel__label"
        type="text"
        v-model="nameStageFunnel"
        @blur="changeNameStage"
      />
      <div class="edit-stage-funnel__move-right">
        <b-icon
          pack="fas"
          icon="arrow-right"
          size="is-small"
          type="is-white"
          v-if="!(listEditStageFunnel.length === indexStageFunnel + 1)"
          @click.native="moveRightStage"
        />
      </div>
      <div class="delete-stage-funnel">
        <b-icon
          pack="fas"
          icon="trash"
          size="is-small"
          type="is-danger"
          @click.native="deleteStage"
        />
      </div>
    </div>
    <div class="edit-stage-funnel__color-mark" />
    <div class="edit-stage-funnel__add-new-stage">
      <b-icon
        pack="fas"
        icon="plus-circle"
        size="is-small"
        type="is-white"
        @click.native="addNewStage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation } from "vuex-class";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
@Component({
  props: {
    nameStageFunnel: String,
    indexStageFunnel: Number,
    salesFunnelId: Number,
    idStageFunnel: Number,
    positionStageFunnel: Number
  }
})
export default class SettingStageFunnel extends Vue {
  @Getter("getListEditStageFunnel") listEditStageFunnel: any;
  @Getter("getStagesFunnel") stagesFunnel: any;

  @Mutation("setListEditStageFunnel") setListEditStageFunnel: any;
  @Mutation("setStagesFunnel") setStagesFunnel: any;

  nameStageFunnel: any;
  indexStageFunnel: any;
  salesFunnelId: any;
  idStageFunnel: any;
  positionStageFunnel: any;

  addNewStage() {
    api(httpClient)
      .funnelStage.add({
        name: "new stage",
        sales_funnel_id: this.salesFunnelId,
        insert_after: this.idStageFunnel
      })
      .then(() => {
        api(httpClient)
          .funnelStage.listStageFunnelByFunnelId(this.salesFunnelId)
          .then((response: any) => {
            this.setListEditStageFunnel(response.data.stages);
            this.setStagesFunnel(response.data.stages);
          });
      })
      .then(() => {
        this.addNewStageFinished();
      })
      .catch(() => {
        this.addNewStageDontFinished();
      });
  }

  deleteStage() {
    api(httpClient)
      .funnelStage.delete(this.idStageFunnel)
      .then(() => {
        this.setListEditStageFunnel([
          ...this.listEditStageFunnel.slice(0, this.indexStageFunnel),
          ...this.listEditStageFunnel.slice(this.indexStageFunnel + 1)
        ]);
        this.setStagesFunnel(this.listEditStageFunnel);
      })
      .then(() => this.deleteFinished())
      .catch(() => this.deleteDontFinished());
  }

  changeNameStage() {
    api(httpClient)
      .funnelStage.update({
        name: this.nameStageFunnel,
        salesFunnelId: this.salesFunnelId,
        id: this.idStageFunnel,
        nextId: this.listEditStageFunnel[this.indexStageFunnel - 1].id
      })
      .then(() =>
        api(httpClient)
          .funnelStage.listStageFunnelByFunnelId(this.salesFunnelId)
          .then((response: any) => {
            this.setStagesFunnel(response.data.stages);
          })
      )
      .then(() => this.updateFinished())
      .catch(() => this.updateDontFinished());
  }

  addNewStageFinished() {
    this.$buefy.snackbar.open("Запись добавлена");
  }

  addNewStageDontFinished() {
    this.$buefy.snackbar.open({
      message: "Запись не добавлена",
      type: "is-danger"
    });
  }

  deleteFinished() {
    this.$buefy.snackbar.open("Запись удалена");
  }

  deleteDontFinished() {
    this.$buefy.snackbar.open({
      message: "Запись не удалена",
      type: "is-danger"
    });
  }

  updateFinished() {
    this.$buefy.snackbar.open("Запись обновлена");
  }

  updateDontFinished() {
    this.$buefy.snackbar.open({
      message: "Запись не обновлена",
      type: "is-danger"
    });
  }

  moveLeftStage() {
    let tempId =
      this.indexStageFunnel - 2 > -1 ? this.indexStageFunnel - 2 : Number(0);
    api(httpClient)
      .funnelStage.update({
        name: this.nameStageFunnel,
        salesFunnelId: this.salesFunnelId,
        id: this.idStageFunnel,
        nextId: this.listEditStageFunnel[tempId].id
      })
      .then(() => {
        api(httpClient)
          .funnelStage.listStageFunnelByFunnelId(this.salesFunnelId)
          .then((response: any) => {
            this.setListEditStageFunnel(response.data.stages);
            this.setStagesFunnel(response.data.stages);
          });
      })
      .then(() => this.updateFinished())
      .catch(() => this.updateDontFinished());
    /*let copyListStageFunnel = [...this.listEditStageFunnel];
            [
                copyListStageFunnel[this.indexStageFunnel - 1],
                copyListStageFunnel[this.indexStageFunnel]
            ] = [
                copyListStageFunnel[this.indexStageFunnel],
                copyListStageFunnel[this.indexStageFunnel - 1]
            ];
            this.setListEditStageFunnel(copyListStageFunnel);
            this.setStagesFunnel(copyListStageFunnel);*/
  }

  moveRightStage() {
    api(httpClient)
      .funnelStage.update({
        name: this.nameStageFunnel,
        salesFunnelId: this.salesFunnelId,
        id: this.idStageFunnel,
        nextId: this.listEditStageFunnel[this.indexStageFunnel].id
      })
      .then(() => {
        api(httpClient)
          .funnelStage.listStageFunnelByFunnelId(this.salesFunnelId)
          .then((response: any) => {
            this.setListEditStageFunnel(response.data.stages);
            this.setStagesFunnel(response.data.stages);
          });
      })
      .then(() => this.updateFinished())
      .catch(() => this.updateDontFinished());
    /*let copyListStageFunnel = [...this.listEditStageFunnel];
            [
                copyListStageFunnel[this.indexStageFunnel],
                copyListStageFunnel[this.indexStageFunnel + 1]
            ] = [
                copyListStageFunnel[this.indexStageFunnel + 1],
                copyListStageFunnel[this.indexStageFunnel]
            ];
            this.setListEditStageFunnel(copyListStageFunnel);
            this.setStagesFunnel(copyListStageFunnel);*/
  }
}
</script>

<style lang="scss" scoped>
.edit-stage-funnel {
  width: 300px;
  text-align: center;
  height: 100vh;
  position: relative;

  &__label {
    text-align: center;
    outline: none;
    width: 265px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
  }

  &__color-mark {
    height: 5px;
    width: 100%;
    background-color: #c1c1c1;
  }

  &__header-stage {
    display: flex;
    justify-content: center;
  }

  &__add-new-stage {
    width: fit-content;
    position: absolute;
    right: -7px;
    z-index: 999;
    top: 13px;
  }

  &__move-left {
    width: 20px;
    height: 21px;
  }

  &__move-right {
    width: 20px;
    height: 21px;
    border-right: 1px solid lightgray;
  }
}

.box-crew .delete-stage-funnel {
  top: -100px;
  transition-duration: 0.6s;
  padding: 10px 0;
  position: absolute;
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  margin: 0;
  display: block;
  width: fit-content;
}

div.box-crew:hover .delete-stage-funnel {
  cursor: pointer;
  top: -30px;
}
</style>

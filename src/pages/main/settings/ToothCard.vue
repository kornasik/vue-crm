<template>
  <div class="tooth-card">
    <div class="tooth-card__panel-actions">
      <b-switch v-model="showChildren">
        {{ $t("tooth_card.showChildren") }}
      </b-switch>
      <b-switch v-model="showLayouts">
        {{ $t("tooth_card.showLayouts") }}
      </b-switch>
      <o-button
        class="tooth-card__btn-save"
        type="is-success"
        @click.native="saveToothCard"
        >{{ $t("tooth_card.btn_save") }}</o-button
      >
    </div>
    <div class="tooth-card__tooth-list">
      <Teeth
        :adults="true"
        :showChildren="showChildren"
        :showLayouts="showLayouts"
      />
    </div>
    <div class="tooth-card__status-list" v-show="selectedTooth">
      <div class="tooth-card__status-list__require-treatment status-list">
        <h3
          class="tooth-card__status-list__require-treatment__title status-list__title"
        >
          {{ $t("tooth_card.requireTreatment") }}
        </h3>
        <StatusTooth :statusToothList="requireTreatment" />
      </div>
      <div class="tooth-card__status-list__healed status-list">
        <h3 class="tooth-card__status-list__healed__title status-list__title">
          {{ $t("tooth_card.treatedTeeth") }}
        </h3>
        <StatusTooth :statusToothList="healed" />
      </div>
      <div class="tooth-card__status-list__absent status-list">
        <h3 class="tooth-card__status-list__absent__title status-list__title">
          {{ $t("tooth_card.absent") }}
        </h3>
        <StatusTooth :statusToothList="absent" />
      </div>
    </div>
    <o-button
      class="tooth-card__edit-tooth"
      type="is-info"
      @click.native="
        $router.push(
          `/settings/tooth-card/${$router.history.current.params.id}/edit`
        )
      "
    >
      {{ $t("tooth_card.editTooth") }}
    </o-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Teeth from "@/components/tooth-card-two-version/components/Teeth.vue";
import StatusTooth from "@/components/tooth-card-two-version/components/ToothStatusPanel.vue";
import { Getter, Mutation, Action } from "vuex-class";
import api from "@/api/index.api";
import { Watch } from "vue-property-decorator";
import httpClient from "@/api/httpClient/httpClient";
import OButton from "@/components/shared/OButton/OButton.vue";

@Component({
  components: {
    Teeth,
    StatusTooth,
    OButton
  }
})
export default class ToothCard extends Vue {
  @Getter("toothCard/toothCardList") toothCardList: any;
  @Getter("toothCard/selectedTooth") selectedTooth: any;
  @Getter("toothCard/idPatient") idPatient: any;
  @Getter("toothCard/idForm") idForm: any;

  @Mutation("toothCard/setToothCardList") setToothCardList: any;
  @Mutation("toothCard/setIdPatient") setIdPatient: any;
  @Mutation("toothCard/setActiveTabTeethCard") setActiveTabTeethCard: any;
  @Mutation("toothCard/setSelectedTooth") setSelectedTooth: any;
  @Mutation("toothCard/setIdForm") setIdForm: any;

  @Action("toothCard/getTeethCard") getTeethCard: any;
  @Action("toothCard/saveToothCard") saveToothCard: any;

  @Watch("activeTab")
  changeActiveTab() {
    this.activeTab
      ? this.setActiveTabTeethCard("deciduous")
      : this.setActiveTabTeethCard("permanent");
  }

  activeTab: number = 0;
  requireTreatment: any = [];
  healed: any = [];
  absent: any = [];
  showChildren: boolean = true;
  showLayouts: boolean = true;

  created() {
    this.setIdPatient((this.$router as any).history.current.params.id);
    this.getTeethCard((this.$router as any).history.current.params.id);
    api(httpClient)
      .teethStatus.list()
      .then((response: any) => {
        this.requireTreatment = response.data.teeth_status.slice(0, 5);
        this.healed = response.data.teeth_status.slice(5, 8);
        this.absent = response.data.teeth_status.slice(8);
      });
  }
}
</script>

<style lang="scss" scoped>
.tooth-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: relative;

  &__panel-actions {
    display: flex;
  }

  &__status-list {
    display: flex;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__btn-save {
    position: absolute;
    right: -150px;
  }
}

.status-list {
  display: flex;
  flex-direction: column;

  &__title {
    padding: 10px 0;
    text-align: left;
    color: gray;
    text-transform: uppercase;
  }
}
</style>

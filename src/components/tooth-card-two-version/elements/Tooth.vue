<template>
  <div class="tooth" @click="activeTooth">
    <div
      class="tooth__item"
      :class="{
        'rt-status': require_treatment,
        'tt-status': treated,
        'a-status': absent,
        'select-tooth': select
      }"
    >
      <img
        class="tooth__item__image"
        :src="urlImage"
        alt="tooth"
        v-if="showLayouts"
      />
      <span class="tooth__item__status" v-if="active">
        {{ totalStatusTooth }}
      </span>
      {{ toothNumber }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation } from "vuex-class";
import { Prop, Watch } from "vue-property-decorator";
import { GROUP_TOOTH, LIST_DISEASES } from "@/shared/enums/tooth-card";

@Component({
  props: {
    toothNumber: String,
    showLayouts: Boolean
  }
})
export default class Teeth extends Vue {
  @Getter("toothCard/toothCardList") toothCardList!: any;
  @Getter("toothCard/selectedTooth") selectedTooth: any;
  @Getter("toothCard/activeTabTeethCard") activeTabTeethCard: any;

  @Mutation("toothCard/setSelectedTooth") setSelectedTooth: any;

  @Prop({ default: () => "" }) urlImage!: any;

  toothNumber: string | undefined;
  active: boolean = false;
  select: boolean = false;
  require_treatment: boolean = false;
  treated: boolean = false;
  absent: boolean = false;
  totalStatusTooth: string = "";
  childrenTooth: number = 49;
  groupTeethCard: string =
    Number(this.toothNumber) > this.childrenTooth
      ? GROUP_TOOTH.deciduous
      : GROUP_TOOTH.permanent;

  @Watch("selectedTooth")
  @Watch("toothCardList")
  selectTooth() {
    this.active = this.activeToothNumber();
    this.select = Number(this.selectedTooth) === Number(this.toothNumber);
    if (!this.IsExistTooth()) {
      this.calcTotalStatusTooth();
    } else {
      this.totalStatusTooth = "";
      this.treated = false;
      this.require_treatment = false;
      this.absent = false;
    }
  }

  activeToothNumber() {
    return Object.keys(this.toothCardList[this.groupTeethCard]).includes(
      this.toothNumber as any
    );
  }

  IsExistTooth() {
    return (
      this.toothCardList[this.groupTeethCard][this.toothNumber as any] === undefined
    );
  }

  created() {
    setTimeout(() => {
      if (this.activeToothNumber()) {
        if (!this.IsExistTooth()) {
          this.calcTotalStatusTooth();
        }
        this.active = true;
      }
    }, 500);
  }

  calcTotalStatusTooth() {
    let require_treatment = 0;
    let treated_teeth = 0;
    let absent = 0;
    this.toothCardList[this.groupTeethCard][this.toothNumber as any].forEach(
      (item: number) => {
        if (item <= LIST_DISEASES.firstCountDiseases) {
          require_treatment++;
        }
        if (
          item >= LIST_DISEASES.secondCountDiseases &&
          item <= LIST_DISEASES.thirdCountDiseases
        ) {
          treated_teeth++;
        }
        if (item >= LIST_DISEASES.fourthCountDiseases) {
          absent++;
        }
      }
    );
    if (treated_teeth > require_treatment) {
      this.totalStatusTooth = "TT";
      this.treated = true;
      this.require_treatment = false;
      this.absent = false;
    }
    if (treated_teeth < require_treatment) {
      this.totalStatusTooth = "RT";
      this.treated = false;
      this.require_treatment = true;
      this.absent = false;
    }
    if (absent) {
      this.totalStatusTooth = "A";
      this.treated = false;
      this.require_treatment = false;
      this.absent = true;
    }
    if (require_treatment === 0 && treated_teeth === 0 && absent === 0) {
      this.totalStatusTooth = "";
      this.treated = false;
      this.require_treatment = false;
      this.absent = false;
    }
  }

  activeTooth() {
    this.setSelectedTooth(this.toothNumber);
  }
}
</script>

<style lang="scss" scoped>
.tooth {
  text-align: center;
  &__item {
    display: flex;
    flex-direction: column;
    padding: 7px 5px 0 5px;
    margin: 0 5px 10px 5px;
    cursor: default;
    border-radius: 5px;
    vertical-align: top;
    &__image {
      max-height: 50px;
    }
    &__status {
      text-align: center;
    }
  }

  &__item:hover {
    background-color: dodgerblue;
  }
}

.select-tooth {
  color: white;
  background-color: #0059ff !important;
}
.rt-status {
  background-color: #ff9a99;
}
.tt-status {
  background-color: yellow;
}
.a-status {
  background-color: #cbccd8;
}
</style>

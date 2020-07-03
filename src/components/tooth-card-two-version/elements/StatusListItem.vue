<template>
  <div
    class="status-list__item"
    :class="[activeStatus ? classActiveStatus : '', classHoverStatus]"
    @click="addStatus"
  >
    <span v-if="statusNumber === 1">A</span>
    <span v-if="statusNumber === 2">C</span>
    <span v-if="statusNumber === 3">P</span>
    <span v-if="statusNumber === 4">Pt</span>
    <span v-if="statusNumber === 5">R</span>
    <span v-if="statusNumber === 6">П</span>
    <span v-if="statusNumber === 7">К</span>
    <span v-if="statusNumber === 8">И</span>
    <span v-if="statusNumber === 9">О</span>
    {{ statusName }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import { GROUP_TOOTH } from "@/shared/enums/tooth-card";

@Component({
  props: {
    statusName: String,
    statusNumber: Number
  }
})
export default class StatusTooth extends Vue {
  @Getter("toothCard/toothCardList") toothCardList: any;
  @Getter("toothCard/selectedTooth") selectedTooth: any;
  @Getter("toothCard/activeTabTeethCard") activeTabTeethCard: any;

  @Mutation("toothCard/setToothCardList") setToothCardList: any;

  statusName: string | undefined;
  statusNumber: number | undefined;
  activeStatus: boolean = false;
  classActiveStatus: string = "";
  classHoverStatus: string = "";
  childrenTooth: number = 49;

  @Watch("selectedTooth")
  @Watch("toothCardList")
  changeSelectedTooth() {
    let groupTeethCard: string =
      Number(this.selectedTooth) > this.childrenTooth
        ? GROUP_TOOTH.deciduous
        : GROUP_TOOTH.permanent;
    const arr = this.toothCardList[groupTeethCard][this.selectedTooth];
    if (!(arr === undefined)) {
      this.activeStatus = arr.includes(this.statusNumber);
    } else {
      this.activeStatus = false;
    }
  }
  created() {
    switch (this.statusNumber) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        this.classActiveStatus = "pink-active";
        this.classHoverStatus = "pink-hover";
        break;
      case 6:
      case 7:
      case 8:
        this.classActiveStatus = "yellow-active";
        this.classHoverStatus = "yellow-hover";
        break;
      case 9:
        this.classActiveStatus = "gray-active";
        this.classHoverStatus = "gray-hover";
        break;
    }
  }

  isExistElement(array: any, groupTeethCard: string) {
    return Object.keys(array[groupTeethCard]).includes(
      String(this.selectedTooth)
    );
  }

  addStatus() {
    let groupTeethCard: string =
      Number(this.selectedTooth) > this.childrenTooth
        ? GROUP_TOOTH.deciduous
        : GROUP_TOOTH.permanent;
    let toothCards = { ...this.toothCardList };
    if (this.isExistElement(toothCards, groupTeethCard)) {
      if (
        !toothCards[groupTeethCard][this.selectedTooth].includes(
          this.statusNumber
        )
      ) {
        toothCards[groupTeethCard][this.selectedTooth].push(this.statusNumber);
      } else {
        const positionStatus = toothCards[groupTeethCard][
          this.selectedTooth
        ].indexOf(this.statusNumber);
        toothCards[groupTeethCard][this.selectedTooth].splice(
          positionStatus,
          1
        );
      }
    } else {
      toothCards[groupTeethCard][this.selectedTooth] = [];
      toothCards[groupTeethCard][this.selectedTooth].push(
        this.statusNumber as never
      );
    }
    for (let numberTooth in toothCards[groupTeethCard]) {
      if (toothCards[groupTeethCard][numberTooth].length === 0) {
        delete toothCards[groupTeethCard][numberTooth];
      }
    }
    this.setToothCardList(toothCards);
  }
}
</script>

<style lang="scss" scoped>
.status-list {
  &__item {
    padding: 5px;
    margin-top: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  .pink-hover:hover {
    background-color: #ff9a99;
  }
  .yellow-hover:hover {
    background-color: yellow;
  }
  .gray-hover:hover {
    background-color: #cbccd8;
  }
  .pink-active {
    background-color: #ff9a99;
    &:before {
      content: "\2714";
      margin-right: 5px;
    }
  }
  .yellow-active {
    background-color: yellow;
    &:before {
      content: "\2714";
      margin-right: 5px;
    }
  }
  .gray-active {
    background-color: #cbccd8;
    &:before {
      content: "\2714";
      margin-right: 5px;
    }
  }
}
</style>

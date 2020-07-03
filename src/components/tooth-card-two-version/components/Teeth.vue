<template>
  <div class="teeth">
    <div
      class="teeth__children"
      :style="{ visibility: showChildren ? 'visible' : 'hidden' }"
    >
      <Tooth
        v-for="(item, index) in childrenToothListFirst"
        :key="index"
        :toothNumber="item"
        :showLayouts="showLayouts"
        :urlImage="urlImage(item)"
      />
    </div>
    <div class="teeth__adults">
      <div class="teeth__adults__top-row">
        <Tooth
          v-for="(item, index) in adultsToothListFirst"
          :key="index"
          :toothNumber="item"
          :showLayouts="showLayouts"
          :urlImage="urlImage(item)"
        />
      </div>
      <div class="teeth__adults__bottom-row">
        <Tooth
          v-for="(item, index) in adultsToothListSecond"
          :key="index"
          :toothNumber="item"
          :showLayouts="showLayouts"
          :urlImage="urlImage(item)"
        />
      </div>
    </div>
    <div
      class="teeth__children"
      :style="{ visibility: showChildren ? 'visible' : 'hidden' }"
    >
      <Tooth
        v-for="(item, index) in childrenToothListSecond"
        :key="index"
        :toothNumber="item"
        :showLayouts="showLayouts"
        :urlImage="urlImage(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Tooth from "@/components/tooth-card-two-version/elements/Tooth.vue";
import { getListTeethMapImage } from "@/api/tooth-card/list-teeth-map-image.api";
import { Image } from "@/types/tooth-card";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
import { Mutation } from "vuex-class";

@Component({
  components: {
    Tooth
  },
  props: {
    adults: Boolean,
    children: Boolean,
    showChildren: Boolean,
    showLayouts: Boolean
  }
})
export default class Teeth extends Vue {
  @Mutation("toothCard/setToothCardList") setToothCardList: any;
  listImageTooth: Image[] = [];
  adultsToothListFirst: string[] = [
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28"
  ];

  adultsToothListSecond: string[] = [
    "48",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38"
  ];

  childrenToothListFirst: string[] = [
    "51",
    "52",
    "53",
    "54",
    "55",
    "61",
    "62",
    "63",
    "64",
    "65"
  ];
  childrenToothListSecond: string[] = [
    "71",
    "72",
    "73",
    "74",
    "75",
    "81",
    "82",
    "83",
    "84",
    "85"
  ];

  beforeCreate() {
    getListTeethMapImage().then(response => {
      this.listImageTooth = response.data.map;
    });
  }

  created() {
    api(httpClient)
      .teethCard.getListByPatientId(32)
      .then((response: any) => {
        this.setToothCardList(response.data.teeth_card);
      });
  }

  urlImage(numberTeeth: string) {
    const defaultImage =
      "https://i.pinimg.com/originals/68/07/98/680798ba281791489d78803a9c2eeed4.jpg";
    if (this.listImageTooth.length > 0) {
      const index = this.listImageTooth.findIndex((image: Image) => {
        return Number(numberTeeth) === image.number;
      });
      return index >= 0
        ? `http://api.ohi-s.by${this.listImageTooth[index].image}`
        : defaultImage;
    }
    return defaultImage;
  }
}
</script>

<style lang="scss" scoped>
.teeth {
  display: flex;
  flex-direction: column;
  &__children {
    display: flex;
    flex-wrap: wrap;
    margin: 21px auto;
  }
  &__adults {
    display: flex;
    flex-direction: column;
    &__top-row {
      display: flex;
    }
    &__bottom-row {
      display: flex;
    }
  }
}
</style>

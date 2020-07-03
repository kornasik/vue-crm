<template>
  <v-navigation-drawer :value="isOpen" app clipped color="#fff">
    <v-list dense>
      <v-list-item
        v-for="el in menuElements"
        :key="el.text"
        link
        :to="{ path: el.path }"
      >
        <v-list-item-content>
          <v-list-item-title class="grey--text text--darken-1">{{
            el.text
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { mapGetters } from "vuex";

@Component({})
export default class Sidebar extends Vue {
  @Getter("isOpen") isOpen: any;

  menuElements = [
    {
      icon: "fa fa-clinic-medical",
      text: "Общая информация",
      path: "/general"
    },
    {
      icon: "fa fa-poll",
      text: "Продажа и маркетинг",
      path: "/sales-and-marketing"
    },
    {
      icon: "fa fa-tooth",
      text: "Карта зубов",
      path: "/general"
    },
    {
      icon: "fa fa-tasks",
      text: "План / Курс / Приёмы лечения",
      path: "/treatment-plans/1"
    },
    {
      icon: "fa fa-images",
      text: "Изображения (РГ / фото)",
      path: "/general"
    },
    {
      icon: "fa fa-fa-address-card",
      text: "Амбулаторная карта",
      path: "/general"
    },
    {
      icon: "fa file-invoice-dollar",
      text: "Финансы (счета на оплату)",
      path: "/general"
    },
    {
      icon: "fa fa-file-alt",
      text: "Документы",
      path: "/general"
    },
    {
      icon: "fa fa-network-wired",
      text: "Специальные мед. модули",
      path: "/general"
    },
    {
      icon: "fa fa-share-square",
      text: "Список изменений",
      path: "/general"
    }
  ];
}
</script>

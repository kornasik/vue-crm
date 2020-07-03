<template>
  <div>
    <b-menu>
      <b-menu-list>
        <b-menu-item
          v-for="(menuItem, i) in menuItems"
          v-bind:key="i"
          class="setting-menu-item"
          :icon="menuItem.icon"
          :to="menuItem.route"
          :label="menuItem.label"
          tag="router-link"
        >
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class MenuView extends Vue {
  menuItems: Array<any> = [];

  created() {
    this.menuItems = [
      {
        icon: "information-outline",
        route: "/settings/currencies",
        label: this.$t("settings.сurrencies")
      },
      {
        icon: "information-outline",
        route: "/settings/formbuilder",
        label: this.$t("settings.formbuilder")
      },
      {
        icon: "information-outline",
        route: "/settings/manipulations",
        label: this.$t("settings.manipulations")
      },
      {
        icon: "information-outline",
        route: "/settings/templates",
        label: this.$t("settings.templates")
      },
      {
        icon: "information-outline",
        route: "/settings/reagents",
        label: this.$t("settings.reagents")
      },
      {
        icon: "information-outline",
        route: "/settings/permissions-group",
        label: this.$t("settings.permissionsGroups")
      },
      {
        icon: "information-outline",
        route: "/settings/users",
        label: this.$t("settings.users")
      },
      {
        icon: "information-outline",
        route: "/settings/tooth-card/32",
        label: this.$t("settings.toothCard")
      }
    ];
  }
}
</script>
<style lang="scss">
.setting-menu-item {
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: 0.1s ease-in-out;
  }
  a span {
    color: #000 !important;
  }
}
.menu-list {
  padding-left: 0 !important;
}
</style>

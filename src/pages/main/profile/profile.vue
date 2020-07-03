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
export default class Profile extends Vue {
  menuItems = [
    {
      icon: "information-outline",
      route: "/login",
      label: "Авторизация пользователя"
    },
    {
      icon: "information-outline",
      route: "/user-invitation",
      label: "Форма приглашения нового пользователя"
    },
    {
      icon: "information-outline",
      route: "/profile/appointment-calendar",
      label: "Appointment Calendar"
    }
  ];
}
</script>
<style lang="scss" />

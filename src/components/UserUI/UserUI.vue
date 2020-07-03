<template>
  <div class="user-column">
    <nav class="user-navigation">
      <app-nav></app-nav>
      <app-minicart></app-minicart>
      <app-notifications-tape></app-notifications-tape>
      <app-group-btn></app-group-btn>
      <div class="user-wrapper">
        <a class="btn sign" href="">Sign in</a>
      </div>
    </nav>
  </div>
</template>

<script>
import UserNavigation from "@/components/MainNavigation/UserNavigation";
import TheMinicart from "@/components/TheMinicart/TheMinicart";
import TheNotificationsTape from "@/components/TheNotificationsTape/TheNotificationsTape";
import GroupButton from "@/components/GroupButton/GroupButton";
export default {
  components: {
    appNav: UserNavigation,
    appMinicart: TheMinicart,
    appNotificationsTape: TheNotificationsTape,
    appGroupBtn: GroupButton
  }
};
</script>

<style lang="scss" scoped>
.user-column {
  margin-left: auto;
}
.user-navigation {
  display: flex;
  align-items: center;
}
.user-wrapper {
  margin-left: 40px;
  .btn.sign {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    padding: 5px 10px;
    background: blue;
    border-radius: 10px;
    color: #fff;
  }
}
</style>

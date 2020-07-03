<template>
  <!-- Common Header -->
  <header class="main-header">
    <div class="header">
      <div v-if="!mobile" @click="expandVerticalMenu" class="menu-burger">
        <div class="burger-wrapper">
          <span class="menu-burger__span" />
          <span class="menu-burger__span menu-burger__span--line-s" />
          <span class="menu-burger__span" />
          <span class="menu-burger__span menu-burger__span--line-s" />
        </div>
      </div>
      <div v-else class="menu-burger" @click="mobileMenu">
        <div class="burger-wrapper">
          <span class="menu-burger__span" />
          <span class="menu-burger__span menu-burger__span--line-s" />
          <span class="menu-burger__span" />
          <span class="menu-burger__span menu-burger__span--line-s" />
        </div>
      </div>
      <div class="main-logo">
        <a class="logo" href="#">
          <img class="logo__img" src="@/assets//logo.svg" alt="ohis-logo" />
        </a>
      </div>
      <app-search-form />
      <app-user-interface />
    </div>
  </header>
</template>

<script>
import SearchForm from "@/components/SearchForm/SearchFrom.vue";
import UserUI from "@/components/UserUI/UserUI.vue";
export default {
  props: {
    mobile: Boolean
  },
  data() {
    return {
      expandMenu: false,
      mobileOpen: false
    };
  },
  components: {
    appSearchForm: SearchForm,
    appUserInterface: UserUI
  },
  methods: {
    mobileMenu() {
      this.mobileOpen = !this.mobileOpen;
      this.$emit("mobileToggle", this.mobileOpen);
    },
    expandVerticalMenu() {
      this.expandMenu = !this.expandMenu;
      this.$emit("expandVerticalMenu", this.expandMenu);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-header {
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 1000;
  .header {
    display: flex;
    // justify-content: space-between;
    background-color: #2d2c6e;
    padding: 13px 20px;
    align-items: center;
    min-height: 70px;
  }
}
.menu-burger {
  .burger-wrapper {
    display: block;
    width: 24px;
    height: 24px;
    position: relative;
    margin-left: 10px;
    margin-right: 45px;
    cursor: pointer;
  }
  &__span {
    background-color: #ffffff;
    display: block;
    width: 18px;
    height: 2px;
    border-radius: 5px;
    position: absolute;
    left: calc(50% - 8px);
    &--line-s {
      width: 14px;
    }
    &:nth-child(1) {
      top: calc(50% - 8px);
    }
    &:nth-child(2) {
      top: calc(50% - 3px);
    }
    &:nth-child(3) {
      top: calc(50% + 2px);
    }
    &:nth-child(4) {
      top: calc(50% + 7px);
    }
  }
}
.main-logo {
  .logo {
    display: block;
    width: 129px;
    height: 44px;
    color: #000;
    text-decoration: none;
  }
}
</style>

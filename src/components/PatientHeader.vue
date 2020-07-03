<template>
  <header class="main-header">
    <div class="header">
      <div class="left">
        <h2 class="has-text-white">
          {{ user ? `${user.name} ${user.surname}` : "ПУПКИН ПЕТР ПЕТРОВИЧ" }}
        </h2>
        <app-search-form />
      </div>
      <div class="right">
        <h5 class="tab">
          <router-link
            class="has-text-white"
            :to="`/patients/${user.id || 32}`"
            replace
            >Общая информация</router-link
          >
        </h5>
        <h5 v-for="(tab, i) in tabs" v-bind:key="i" class="tab">
          <router-link
            class="has-text-white"
            :to="{ name: tab.path, params: { id: user.id || 32 } }"
            replace
            >{{ tab.title }}</router-link
          >
        </h5>
      </div>
    </div>
  </header>
</template>

<script>
import SearchForm from "@/components/SearchForm/SearchFrom";
export default {
  props: {
    user: Object
  },
  data() {
    return {
      expandMenu: false,
      mobileOpen: false,
      tabs: [
        {
          title: "",
          path: ""
        },
        {
          title: "Карта зубов",
          path: "tooth-card"
        },
        {
          title: "План/курс/приём",
          path: "treatment-plans"
        },
        {
          title: "Изображения",
          path: "pictures"
        },
        {
          title: "Амбулаторная карта",
          path: "patient-card"
        },
        {
          title: "Финансы",
          path: "finances"
        },
        {
          title: "Документы",
          path: "documents"
        }
      ]
    };
  },
  components: {
    appSearchForm: SearchForm
  },
  methods: {
    mobileMenu() {
      this.mobileOpen = !this.mobileOpen;
      this.$emit("mobileToggle", this.mobileOpen);
    },
    expandVerticalMenu() {
      this.expandMenu = !this.expandMenu;
      this.$emit("expandVerticalMenu", this.expandMenu);
    },
    getPathWithId(path, id) {
      return `${id || 32}${path}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  width: 50%;
  justify-content: space-between;
}
.right {
  display: flex;
}
.main-header {
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 1000;
  .header {
    display: flex;
    background-color: #2d2c6e;
    padding: 13px 20px;
    align-items: center;
    min-height: 70px;
    justify-content: space-between;
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
.tab {
  display: flex;
  text-align: center;
  padding: 0 10px;
}
</style>

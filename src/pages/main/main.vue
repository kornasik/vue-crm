<template>
  <div id="app">
    <div class="columns is-gapless main-content">
      <aside :class="{ 'aside--close': open }" class="aside">
        <app-vertical-menu :toggleExpandMenu="open" />
      </aside>
      <main class="column">
        <router-view />
      </main>
      <!-- <aside class="column filter">
        Filter
      </aside> -->
    </div>
    <!-- <main>
      <app-main-menu :toggleMenu="open" v-if="!mobileView" />
      <app-mobile v-else :nav="showNav" @close="closeMenu" />
      <div :class="{ s: open }" class="wrapping">
        <router-view />
      </div>
    </main> -->
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";
import VerticalMenu from "@/components/MainNavigation/VerticalMenu";
// import MobileNavigation from '@/components/MainNavigation/MobileNavigation'
export default {
  components: {
    // appHeader: TheHeader,
    appVerticalMenu: VerticalMenu
    // appMobile: MobileNavigation
  },
  data() {
    return {
      mobileView: true,
      showNav: false,
      openMenu: false,
      open: false
    };
  },
  // created () {
  //   if (process.browser) {
  //     this.handleView()
  //   }
  // },
  mounted() {
    if (process.browser) {
      this.handleView();
    }
  },
  methods: {
    handleView() {
      // if (process.client) {
      this.mobileView = window.innerWidth <= 1200;
      // }
    },
    searchIconClick() {
      alert("You wanna make a search?");
    },
    expandVerticalMenu(event) {
      this.open = event;
    },
    toggleMobile(event) {
      this.showNav = event;
    },
    closeMenu(event) {
      this.showNav = event;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.aside {
  width: 210px;
  background-color: #b1bfd8;
  background-image: linear-gradient(315deg, #e5e5e5 0%, #c8c8c8 300%);
  transition: width 0.3s ease-in-out;
  &--close {
    width: 72px;
  }
}
.filter {
  max-width: 250px;
}
.wrapping {
  margin-left: 210px;
  margin-top: 70px;
  &.s {
    margin-left: 100px;
  }
}
main {
  background: #e5e5e5;
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: $base-color;
  padding: 17px 20px;
  align-items: center;
  .menu-burger {
    display: block;
    width: 24px;
    height: 24px;
    position: relative;
    margin-left: 10px;
    margin-right: 45px;
    cursor: pointer;
    span {
      background-color: #fff;
      display: block;
      height: 2px;
      left: calc(50% - 8px);
      position: absolute;
      width: 14px;
      border-radius: 5px;
      &:nth-child(1) {
        top: calc(50% - 8px);
        width: 18px;
      }
      &:nth-child(2) {
        top: calc(50% - 3px);
      }
      &:nth-child(3) {
        top: calc(50% + 2px);
        width: 18px;
      }
      &:nth-child(4) {
        top: calc(50% + 7px);
      }
    }
  }
  .search-wrapper,
  .language-wrapper {
    margin-left: 30px;
  }
  .language-wrapper {
    a {
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: 500;
      color: #606893;
      text-transform: uppercase;
      &:first-child {
        color: #fff;
        padding-right: 5px;
        border-right: 2px solid #fff;
      }
    }
  }
  .right-row {
    margin-left: auto;
  }
  .navigaton,
  .header-menu {
    display: flex;
  }
  .header-menu {
    li {
      padding: 0 10px;
      border-right: 2px solid #606893;
    }
  }
  .minicart-wrapper {
    margin-left: 20px;
  }
  .minicart-wrapper,
  .notifications-wrapper,
  .more-btn-wrapper {
    margin-right: 40px;
  }
  .user-wrapper {
    .btn.sign {
      font-family: "Roboto", sans-serif;
      font-style: normal;
      padding: 5px 10px;
      background: blue;
      border-radius: 10px;
      color: #fff;
    }
  }
  .action {
    display: block;
    position: relative;
  }
  .counter.qty {
    background: #fff;
    display: inline-block;
    margin: 3px 0 0;
    text-align: center;
    white-space: normal;
    min-width: 21px;
    height: 21px;
    line-height: 21px;
    border-radius: 50%;
    padding: 0;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-size: 10px;
    color: $base-color;
    top: -13px;
    left: 17px;
    position: absolute;
  }
}
.section-wrap {
  background: #e5e5e5;
  display: flex;
  .section-menu {
    padding-top: 25px;
    background: #fff;
  }
  .list-menu {
    height: 100%;
  }
  .list-menu a {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 11px;
    color: #2d2c6e;
    display: block;
    padding: 0.5em 15px;
    // &.is-active {
    //   background-color: #606893;
    // }
  }
}
.wide-section-menu {
  width: 210px;
  .list-menu a {
    display: flex;
    align-items: center;
    padding-left: 29px;
    .text-menu {
      margin-left: 10px;
    }
  }
}
.narrow-section-menu {
  width: 82px;
  text-align: center;
  .list-menu li {
    margin-bottom: 20px;
  }
  .list-menu a {
    img {
      margin-bottom: 10px;
    }
    .text-menu {
      margin-top: 10px;
    }
  }
}
.link-item {
  color: #ffffff;
}
.section-menu-close .menu-list a {
  text-align: center;
}
.section-menu-close {
  position: fixed;
  width: 82px;
  padding: 0;
}
.ico img {
  display: block;
}
@media screen and (max-width: 1200px) {
  .wrapping {
    margin-left: 0;
    &.s {
      margin-left: 0;
    }
  }
}
.v-application ul,
.v-application ol {
  padding-left: 0;
}
</style>

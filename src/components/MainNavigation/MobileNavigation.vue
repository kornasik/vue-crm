<template>
  <div
    :class="{ open: nav }"
    class="main-horizont-menu"
    @click="$emit('close', false)"
  >
    <div class="content-menu">
      <aside class="content-menu__wide-wrap section-menu">
        <ul class="main-horizont-menu__list">
          <li class="main-horizont-menu__item">
            <router-link
              :to="{ name: 'catalog' }"
              class="main-horizont-menu__link"
              exact-active-class="is-active"
            >
              <img :src="'@/assets/bell.svg'" />
              <!-- <b-icon :icon="item.icon" /> -->
              <span class="text-menu">{{ item.title }}</span>
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nav: Boolean
  },
  data() {
    return {
      // items: [
      //   {
      //     title: 'Home',
      //     icon: 'home',
      //     to: { name: 'index' }
      //   },
      //   {
      //     title: 'Каталог',
      //     icon: 'home',
      //     src: '@/assets/catalog.svg',
      //     to: { name: 'catalog' }
      //   },
      //   {
      //     title: 'Избранное',
      //     icon: 'lightbulb',
      //     src: '@/assets/favorites.svg',
      //     to: { name: 'favorites' }
      //   },
      //   {
      //     title: 'Скидки',
      //     icon: 'lightbulb',
      //     src: '@/assets/discounts.svg',
      //     to: { name: 'discounts' }
      //   },
      //   {
      //     title: 'Предзаказ',
      //     icon: 'lightbulb',
      //     src: '@/assets/preorder.svg',
      //     to: { name: 'preorder' }
      //   },
      //   {
      //     title: 'Программа лояльности',
      //     icon: 'lightbulb',
      //     src: '@/assets/info.svg',
      //     to: { name: 'shop-category_name' }
      //   }
      // ]
    };
  }
};
</script>

<style lang="scss" scoped>
.main-horizont-menu {
  position: fixed;
  top: 0;
  // left: 0;
  bottom: 0;
  right: auto;
  background: #ffffff;
  z-index: 2000;
  width: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  left: -300px;
  -webkit-overflow-scrolling: touch;
  -webkit-transition: left 0.3s;
  -moz-transition: left 0.3s;
  -ms-transition: left 0.3s;
  transition: left 0.3s;
  visibility: hidden;
  &.open {
    visibility: visible;
    left: 0;
    -webkit-overflow-scrolling: touch;
    -webkit-transition: left 0.3s;
    -moz-transition: left 0.3s;
    -ms-transition: left 0.3s;
    transition: left 0.3s;
  }
  &__list {
    display: flex;
    width: 210px;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    &--narrow-wrap {
      width: 100px;
      .main-horizont-menu__link {
        padding: 0 20px;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
  &__item {
    margin-bottom: 30px;
  }
  &__link {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #2d2c6e;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-left: 29px;
    .text-menu {
      margin-left: 10px;
    }
  }
  .content-menu {
    height: 100%;
    width: 300px;
    background: #ffffff;
  }
}
.section-menu {
  padding-top: 25px;
}
</style>

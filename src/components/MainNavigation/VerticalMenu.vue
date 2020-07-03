<template>
  <ul :class="{ 'menu--close': toggleExpandMenu }" class="menu menu-vertical">
    <div class="main-logo">
      <a class="logo" href="#">
        <img class="logo__img" src="@/assets//logo.svg" alt="ohis-logo" />
      </a>
    </div>
    <li v-for="(item, key) of items" :key="key" class="menu__item">
      <router-link
        :to="{ path: item.path }"
        class="menu__link"
        exact-active-class="is-active"
      >
        <!-- <i :class="`icon icon-${item.icon}`" /> -->
        <span class="menu__label">{{ item.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    toggleExpandMenu: Boolean
  },
  data() {
    return {
      items: [
        {
          title: "Пользователи",
          icon: "users",
          path: "/users"
        },
        {
          title: "Пациенты",
          icon: "catalog",
          path: "/patients"
        },
        {
          title: "Продажи и маркетинг",
          icon: "favorites",
          path: "/sales-and-marketing"
        },
        {
          title: "Настройки",
          icon: "discounts",
          path: "/settings"
        },
        {
          title: "Профиль",
          icon: "preorder",
          path: "/profile"
        },
        {
          title: "Выйти",
          icon: "preorder",
          path: "login"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.main-logo {
  height: 74px;
  display: flex;
  align-items: center;
  .logo {
    display: block;
    width: 129px;
    height: 44px;
    color: #000;
    text-decoration: none;
    margin: 0 auto;
  }
}
.menu {
  list-style: none;
  position: relative;
  margin: 0;
  &--close {
    .menu__link {
      padding: 20px 0;
      text-align: center;
      justify-content: center;
    }
    .menu__label {
      width: 100%;
      margin-top: 10px;
      margin-left: 0;
    }
  }
  &__link {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-family: "Roboto", sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    color: #2d2c6e;
    padding: 20px;
    padding-left: 33px;
    list-style: none;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    transition: 0.1s ease-in-out;
    &:hover {
      background: lighten(#2d2c6e, 40%);
      transition: 0.1s ease-in-out;
      .icon::before {
        fill: rgb(251, 227, 227);
      }
      .menu__label {
        color: #fff;
      }
    }
  }
  &__label {
    transition: margin 0.3s ease-in-out;
    margin-left: 10px;
  }
}
.icon::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
}
.icon {
  display: block;
  width: 18px;
  height: 18px;
  &-catalog {
    background: url("../../assets/catalog.svg") no-repeat;
  }
  &-favorites {
    background: url("../../assets/favorites.svg") no-repeat;
  }
  &-discounts {
    background: url("../../assets/discounts.svg") no-repeat;
  }
  &-preorder {
    background: url("../../assets/preorder.svg") no-repeat;
  }
  &-info {
    background: url("../../assets/info.svg") no-repeat;
  }
}
</style>
~ @

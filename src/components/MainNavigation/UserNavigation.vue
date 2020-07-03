<template>
  <ul class="menu-list">
    <li class="menu-list__item" v-for="(item, key) of items" :key="key">
      <router-link class="menu-list__link" :to="item.to">{{
        item.title
      }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Лента",
          to: { name: "tape" }
        },
        {
          title: "Контакты",
          to: { name: "tape" }
        },
        {
          title: "Сообщения",
          to: { name: "message" }
        },
        {
          title: "Вакансии",
          to: { name: "vacancy" }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  &__link {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-decoration: none;
    color: #ffffff;
    padding: 0 10px;
    border-right: 1px solid #606893;
  }
}
</style>

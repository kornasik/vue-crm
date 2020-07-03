<template>
  <div class="edit-stage-funnel__header">
    <b-button type="is-primary" @click="back">
      <b-icon pack="fas" icon="arrow-left" size="is-small" type="is-white" />
      Вернуться
    </b-button>
    <div class="edit-stage-funnel__header__buttons">
      <!--<b-button type="is-light">Отменить</b-button>
      <b-button type="is-primary">Сохранить</b-button>-->
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.edit-stage-funnel {
  &__header {
    height: 54px;
    background-color: white;
    border-bottom: 1px solid lightgray;
    &__buttons {
      display: flex;
      justify-content: space-around;
      width: 231px;
      margin: 0 30px 0 auto;
      padding-top: 7px;
    }
  }
}
</style>

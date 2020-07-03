<template>
  <div class="search">
    <form class="search-form" action="">
      <div class="search-form__field-wrap">
        <input
          type="text"
          placeholder="Поиск по пациентам"
          class="search-form__input-text"
        />
      </div>
      <div class="search-form__button-wrap">
        <button class="search-form__button-search" type="submit">
          <span class="search-form__button-text">Search</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.search {
  .search-form {
    position: relative;
    width: 280px;
    &__input-text {
      background: #fff;
      border: none;
      border-radius: 2px;
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #afafaf;
      width: 100%;
      height: 36px;
      line-height: 16px;
      padding: 0 20px;
      padding-right: 35px;
      vertical-align: baseline;
      box-sizing: border-box;
    }
    &__button-text {
      font-size: 0;
      z-index: -1;
      overflow: hidden;
      position: absolute;
    }
    &__button-search {
      display: inline-block;
      border: 0;
      box-shadow: none;
      line-height: inherit;
      margin: 0;
      padding: 0;
      text-decoration: none;
      text-shadow: none;
      font-weight: 400;
      position: absolute;
      right: 30px;
      top: 50%;
      margin-top: -10px;
      z-index: 1;
      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        // background-image: url('@/assets/search-ico.svg');
      }
    }
  }
}
</style>

<template>
  <div class="group-button">
    <div class="group-button-wrapper">
      <a class="action" href="#">
        <img src="@/assets/group-btn.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group-button {
  .group-button-wrapper {
    display: block;
    margin-left: 40px;
  }
  .action {
    display: block;
    position: relative;
    width: 24px;
    height: 24px;
    text-decoration: none;
    padding: 0;
  }
}
</style>

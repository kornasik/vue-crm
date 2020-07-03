<template>
  <div class="minicart">
    <div class="minicart-wrapper">
      <a class="action" href="#">
        <img src="@/assets//shopping-cart.svg" alt="" />
        <span class="counter qty empty">
          <span class="counter-number">152</span>
        </span>
        <span class="cart-title" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.minicart {
  display: block;
}
.minicart-wrapper {
  display: block;
  margin-left: 20px;
  .action {
    display: block;
    position: relative;
    width: 24px;
    height: 24px;
    text-decoration: none;
    padding: 0;
  }
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
  color: #2d2c6e;
  top: -13px;
  left: 17px;
  position: absolute;
}
</style>

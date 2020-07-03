<template>
  <button class="tooth-card__btn" @click="sendRequestToothCard">
    <!--    {{$t("tooth_card.btn_save")}}-->Save
  </button>
</template>

<script>
export default {
  name: "Button",
  methods: {
    sendRequestToothCard() {
      // console.log("send");
    }
  }
};
</script>

<style scoped lang="scss">
.tooth-card__btn {
  padding: 0;
  border: none;
  font: inherit;
  color: blueviolet;
  background-color: transparent;
  cursor: pointer;

  &:after {
    content: "\2192";
    color: blueviolet;
    margin-left: 5px;
  }
}
</style>

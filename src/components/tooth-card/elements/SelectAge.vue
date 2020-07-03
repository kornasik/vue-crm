<template>
  <div class="select-age">
    <label
      for="adults"
      :class="{ active: activeSelectAge }"
      @click="selectAgeAdults"
    >
      <input type="radio" id="adults" name="select-age" />
      <!--      {{$t('tooth_card.adults')}}-->adults
    </label>
    <label
      for="children"
      :class="{ active: !activeSelectAge }"
      @click="selectAgeChildren"
    >
      <input type="radio" id="children" name="select-age" />
      <!--      {{$t('tooth_card.children')}}-->children
    </label>
  </div>
</template>

<script>
export default {
  name: "SelectAge",
  data() {
    return {
      activeSelectAge: true
    };
  },
  methods: {
    selectAgeAdults() {
      this.activeSelectAge = true;
      this.$store.commit("changeTeethAge", "adults");
    },
    selectAgeChildren() {
      this.activeSelectAge = false;
      this.$store.commit("changeTeethAge", "children");
    }
  }
};
</script>

<style scoped>
.select-age {
  width: 180px;
  display: flex;
  justify-content: space-around;
}
label {
  margin: 0;
}
input[type="radio"] {
  display: none;
}
.active {
  color: blue;
  text-decoration: underline blue;
}
</style>

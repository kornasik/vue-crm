<template>
  <div class="tooth-card-container">
    <div class="tooth-card-block">
      <Tooth
        class="tooth-card__adults"
        v-if="this.$store.state.ToothCard.teethAge === 'adults'"
        :data="adults"
      />
    </div>
    <div class="tooth-card-block">
      <Tooth
        class="tooth-card__children"
        v-if="this.$store.state.ToothCard.teethAge === 'children'"
        :data="children"
      />
    </div>
    <StatusTooth :edit="edit" />
  </div>
</template>

<script>
import Tooth from "../elements/Tooth";
import StatusTooth from "./StatusTooth";

export default {
  name: "ToothCardContent",
  props: {
    edit: Boolean
  },
  components: {
    StatusTooth,
    Tooth
  },
  data() {
    return {
      adults: this.$store.state.ToothCard.adults,
      children: this.$store.state.ToothCard.children
    };
  },
  methods: {
    changePropertiesTooth(color, $event) {
      this.$store.commit("changePropertiesSelectedTooth", $event.target.id);
      this.$store.commit("changeColor", color);
      const stateToothCard = this.$store.state.ToothCard;
      const propertiesActiveTooth =
        stateToothCard.adults[String(stateToothCard.selectedTooth)];

      const labelItemTooth = document.querySelectorAll(
        "label.tooth-card-status-item"
      );
      const inputItemTooth = document.querySelectorAll(
        "input.tooth-card-status-item"
      );

      inputItemTooth.forEach(inputItem => {
        labelItemTooth.forEach(labelItem => {
          if (
            propertiesActiveTooth[String(inputItem.value)] &&
            labelItem.id === inputItem.value
          ) {
            const listClass = [...labelItem.classList];
            if (!listClass.includes(`active-status`)) {
              labelItem.className += ` active-status ${color}`;
            }
          } else if (
            !propertiesActiveTooth[String(inputItem.value)] &&
            labelItem.id === inputItem.value
          ) {
            const listClass = [...labelItem.classList];
            if (listClass.includes(`active-status`)) {
              labelItem.classList.remove(`active-status`);
              labelItem.classList.remove(`${color}`);
            }
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.tooth-card {
  &-container {
    margin: 20px 0 0 20px;
    display: flex;
    flex-direction: column;
  }

  &-block {
    display: flex;
  }

  &__adults {
    width: 630px;
  }

  &__children {
    width: 400px;
  }
}
</style>

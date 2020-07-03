<template>
  <div class="tooth-card-status">
    <div class="tooth-card-status__require-treatment">
      <div class="tooth-card-status-title">
        <!-- {{$t('tooth_card.requireTreatment')}} -->requireTreatment
      </div>

      <label
        v-for="(item, index) of propertiesRequiringTreatment"
        :key="index"
        :for="index"
        class="tooth-card-status-item hover-pink"
        :id="index"
        @click="edit ? changePropertiesTooth('pink', $event) : null"
      >
        <input
          :id="index"
          type="checkbox"
          class="tooth-card-status-item"
          :value="index"
        />
        <span class="tooth-card-status-prefix">
          {{ item }}
        </span>
        <!-- {{$t(`tooth_card.${index}`)}} -->{{ index }}
      </label>
    </div>

    <div class="tooth-card-status__treated-teeth">
      <div class="tooth-card-status-title">
        <!-- {{$t('tooth_card.treatedTeeth')}} -->treatedTeeth
      </div>

      <label
        v-for="(item, index) of propertiesTreatedTeeth"
        :key="index"
        :for="index"
        class="tooth-card-status-item hover-yellow"
        :id="index"
        @click="edit ? changePropertiesTooth('yellow', $event) : null"
      >
        <input
          :id="index"
          type="checkbox"
          class="tooth-card-status-item"
          :value="index"
        />
        <span class="tooth-card-status-prefix">
          {{ item }}
        </span>
        <!-- {{$t(`tooth_card.${index}`)}} -->{{ index }}
      </label>
    </div>

    <div class="tooth-card-status__absent">
      <div class="tooth-card-status-title">
        <!-- {{$t('tooth_card.absent')}} -->tooth_card.absent
      </div>

      <label
        v-for="(item, index) of absent"
        :key="index"
        :for="index"
        class="tooth-card-status-item hover-gray"
        :id="index"
        @click="edit ? changePropertiesTooth('gray', $event) : null"
      >
        <input
          :id="index"
          type="checkbox"
          class="tooth-card-status-item"
          :value="index"
        />
        <span class="tooth-card-status-prefix">
          {{ item }}
        </span>
        <!-- {{$t(`tooth_card.${index}`)}} -->{{ index }}
      </label>
    </div>
  </div>
</template>

<script>
import {
  propertiesRequiringTreatment,
  propertiesTreatedTeeth,
  absent
} from "../date-for-fill/statusTooth";

export default {
  name: "StatusTooth",
  props: {
    edit: Boolean
  },
  data() {
    return {
      propertiesRequiringTreatment,
      propertiesTreatedTeeth,
      absent
    };
  },
  methods: {
    changePropertiesTooth(color, $event) {
      this.$store.commit("changePropertiesSelectedTooth", $event.target.id);
      this.$store.commit("changeColor", color);

      let stateToothCard = {};
      if (this.$store.state.ToothCard.teethAge === "adults") {
        stateToothCard = this.$store.state.ToothCard.adults;
      } else {
        stateToothCard = this.$store.state.ToothCard.children;
      }

      const propertiesActiveTooth =
        stateToothCard[String(this.$store.state.ToothCard.selectedTooth)];

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
.tooth-card-status {
  display: flex;
  justify-content: space-between;
  max-width: 630px;
  margin-top: 40px;
  color: #adb9d1;

  &-title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    text-align: left;
    margin-bottom: 10px;
  }

  &-prefix {
    font-weight: bold;
    margin-right: 3px;
  }

  &-item {
    padding: 5px;
    margin-top: 5px;
  }

  &__require-treatment {
    display: flex;
    flex-direction: column;
    width: 30%;
    text-align: left;
  }

  &__absent {
    display: flex;
    flex-direction: column;
    width: 30%;
    text-align: left;
  }

  &__treated-teeth {
    display: flex;
    flex-direction: column;
    width: 30%;
    text-align: left;
  }
}

.hover {
  &-pink:hover {
    cursor: pointer;
    background-color: #ff9a99;
    color: black;
    border-radius: 3px;
  }

  &-yellow:hover {
    cursor: pointer;
    background-color: #ffec6e;
    border-radius: 3px;
    color: black;
  }
  &-gray:hover {
    cursor: pointer;
    background-color: #cbccd8;
    border-radius: 3px;
    color: black;
  }
}

label:before {
  content: "\2714";
  margin-right: 10px;
}

input[type="checkbox"] {
  display: none;
}

.yellow {
  background-color: #ffec6e;
}

.pink {
  background-color: #ff9a99;
}
.gray {
  background-color: #cbccd8;
}

.active-status {
  border-radius: 3px;
  color: black;
}
</style>

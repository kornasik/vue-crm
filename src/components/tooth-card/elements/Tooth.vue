<template>
  <div class="tooth">
    <ToothItem
      v-for="(item, index) in data"
      :key="index"
      :index="index"
      :data="data"
    />
  </div>
</template>

<script>
import ToothItem from "../components/ToothItem";

export default {
  name: "Tooth",
  props: {
    data: Object
  },
  components: {
    ToothItem
  },
  data() {
    return {};
  },
  mounted() {
    let filterMarkedTooth = {};
    const toothItemWrapper = document.querySelectorAll(".tooth-item");
    for (let item in this.data) {
      for (let item2 in this.data[String(item)]) {
        if (this.data[String(item)][item2]) {
          filterMarkedTooth[item] = this.data[String(item)];
        }
      }
    }

    toothItemWrapper.forEach(wrapperItem => {
      for (let filterItem in filterMarkedTooth) {
        if (
          wrapperItem.innerText === filterItem &&
          ![...wrapperItem.classList].includes("active-tooth")
        ) {
          let pink = 0;
          let yellow = 0;
          let gray = 0;
          for (let item in filterMarkedTooth[filterItem]) {
            if (filterMarkedTooth[filterItem][item]) {
              switch (item) {
                case "parodontitis":
                case "caries":
                case "pulpitis":
                case "periodontitis":
                case "root":
                  pink++;
                  break;
                case "sealed":
                case "crown":
                case "artificialTooth":
                  yellow++;
                  break;
                case "absent":
                  gray++;
                  break;
              }
            }
          }
          let color = "";
          if (pink > yellow) {
            color = "pink";
          } else {
            color = "yellow";
          }
          if (gray) {
            color = "gray";
          }

          wrapperItem.classList.add(color);
        }
      }
    });

    this.$store.commit("setActiveTooth", filterMarkedTooth);
  }
};
</script>

<style scoped>
.tooth {
  display: flex;
  flex-wrap: wrap;
}

.tooth-item {
  padding: 0 5px;
  margin: 15px 5px 5px 5px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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

.active-tooth {
  background-color: #0059ff;
  color: white;
}

.pink:before {
  content: "П";
  display: flex;
  justify-content: center;
}

.yellow:before {
  content: "C";
  display: flex;
  justify-content: center;
}

.gray:before {
  content: "O";
  display: flex;
  justify-content: center;
}
</style>

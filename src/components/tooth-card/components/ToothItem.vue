<template>
  <div :class="classTooth" @click="statusTooth">
    {{ index }}
  </div>
</template>

<script>
export default {
  name: "ToothItem",
  props: {
    index: String,
    data: Object,
    edit: Boolean
  },
  data() {
    return {
      adults: this.$store.state.ToothCard.adults,
      children: this.$store.state.ToothCard.children,
      activeTooth: this.$store.state.ToothCard.activeTooth,
      color: [
        { parodontitis: "pink" },
        { caries: "pink" },
        { pulpitis: "pink" },
        { periodontitis: "pink" },
        { root: "pink" },
        { crown: "yellow" },
        { artificialTooth: "yellow" },
        { absent: "gray" },
        { sealed: "yellow" }
      ]
    };
  },
  computed: {
    classTooth: function() {
      for (let item in this.activeTooth) {
        if (Number(item) === Number(this.index)) {
          return {
            "tooth-item": true,
            yellow: true
          };
        }
      }
      return {
        "tooth-item": true
      };
    }
  },
  methods: {
    statusTooth(event) {
      const numberTooth = event.target;
      this.$store.commit(
        "changeSelectedTooth",
        Number(numberTooth.textContent)
      );

      document.querySelectorAll(".tooth-item").forEach(item => {
        item.className = "tooth-item";
      });
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
      numberTooth.className += " active-tooth";
      const labelItemTooth = document.querySelectorAll(
        "label.tooth-card-status-item"
      );
      labelItemTooth.forEach(labelItem => {
        const listClassItem = [...labelItem.classList];
        if (listClassItem.includes("active-status")) {
          labelItem.classList.remove("active-status");
        }
      });
      labelItemTooth.forEach(labelItem => {
        const listClassItem = [...labelItem.classList];
        this.color.forEach(colorItem => {
          if (listClassItem.includes(String(Object.values(colorItem)))) {
            labelItem.classList.remove(String(Object.values(colorItem)));
          }
        });
      });
      /* Фильтруем список свойств конкретного зуба. Где трансформируем объект свойств со значениям в массив массивов свойств
          с их значениями. Где в массиве каждый массив представляет из себя первым значением свойство зуба ,а второе значение является
          булевым значением
           */
      const activeTooth = this.data[
        String(this.$store.state.ToothCard.selectedTooth)
      ];
      const filterArrayActiveTooth = Object.entries(activeTooth).filter(
        item => {
          return item[1] === true;
        }
      );
      filterArrayActiveTooth.forEach(filterItem => {
        labelItemTooth.forEach(labelItem => {
          if (filterItem[0] === labelItem.id) {
            this.color.forEach(colorItem => {
              if (String(Object.keys(colorItem)) === labelItem.id) {
                labelItem.classList.add("active-status");
                labelItem.classList.add(String(Object.values(colorItem)));
              }
            });
          }
        });
      });
    }
  }
};
</script>

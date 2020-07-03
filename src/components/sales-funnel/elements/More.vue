<template>
  <div class="sales-funnel__more">
    <div class="sales-funnel__more-threedots">
      <div class="dropdown">
        <button class="dropbtn" @click.stop="isOpen = !isOpen">
          <i class="fas fa-ellipsis-h three-dots" />
        </button>
        <div class="dropdown-contents" :class="{ open: isOpen }">
          <a>
            <i class="fas fa-download icon-import" />
            Импорт
          </a>
          <a :style="{ borderBottom: '1px solid rgba(211,211,211, 0.4)' }"
            ><i class="fas fa-tasks icon-select" />
            Массовые действия
          </a>
          <span class="dropdown_sort-title">Сортировка</span>
          <a
            id="1"
            :class="{ activeSort: selectedSort === '1' }"
            @click="actionLastMessage"
          >
            По последнему сообщению
            <span class="icon-arrow">{{
              $store.state.SalesFunnel.sortList.lastMessage ? "↑" : "↓"
            }}</span>
          </a>
          <a
            id="2"
            :class="{ activeSort: selectedSort === '2' }"
            @click.stop="actionLastEvent"
          >
            По последнему событию
            <span class="icon-arrow">{{
              $store.state.SalesFunnel.sortList.lastEvent ? "↑" : "↓"
            }}</span>
          </a>
          <a
            id="3"
            :class="{ activeSort: selectedSort === '3' }"
            @click.stop="actionCreateData"
          >
            По дате создания
            <span class="icon-arrow">{{
              $store.state.SalesFunnel.sortList.createDate ? "↑" : "↓"
            }}</span>
          </a>
          <a
            id="4"
            :class="{ activeSort: selectedSort === '4' }"
            @click.stop="actionName"
          >
            По названию
            <span class="icon-arrow">{{
              $store.state.SalesFunnel.sortList.name ? "↑" : "↓"
            }}</span>
          </a>
          <a
            id="5"
            :class="{ activeSort: selectedSort === '5' }"
            @click.stop="actionBudget"
          >
            По бюджету
            <span class="icon-arrow">{{
              $store.state.SalesFunnel.sortList.budget ? "↑" : "↓"
            }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "More",
  data: () => ({
    isOpen: false,
    lastMessage: false,
    selectedSort: ""
  }),
  methods: {
    actionLastMessage(event) {
      this.selectedSort = event.target.id;
      this.$store.commit("sortListLastMessage");
    },
    actionLastEvent(event) {
      this.selectedSort = event.target.id;
      this.$store.commit("sortListLastEvent");
    },
    actionCreateData(event) {
      this.selectedSort = event.target.id;
      this.$store.commit("sortListCreateDate");
    },
    actionName(event) {
      this.selectedSort = event.target.id;
      this.$store.commit("sortListName");
    },
    actionBudget(event) {
      this.selectedSort = event.target.id;
      this.$store.commit("sortListBudget");
    }
  }
};
</script>

<style lang="scss">
.sales-funnel {
  &__more {
    display: flex;
    align-items: center;
  }

  &__more-threedots {
    padding: 0 20px 0 20px;
    cursor: pointer;
  }
}

.dropbtn {
  color: black;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-contents {
  display: none;
  position: absolute;
  top: 32px;
  left: -21px;
  background-color: white;
  border: 1px solid lightgray;
  min-width: 225px;
  z-index: 1;
  width: max-content;
  text-align: left;
  font-size: 14px;
}

.dropdown-contents a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-contents a:hover {
  background-color: #f1f1f1;
}

.three-dots:hover {
  opacity: 0.6;
}

.dropdown_sort-title {
  display: block;
  color: lightgray;
  padding: 0 16px;
  margin: 12px 0;
  height: 20px;
  cursor: default;
}

.open {
  display: block;
}

.icon-arrow {
  font-size: 18px;
  font-weight: bold;
}

.icon-import {
  color: #7e7e7e;
  margin-right: 5px;
}

.icon-select {
  color: #4c8bf7;
  margin-right: 5px;
}

.activeSort {
  color: #1b94d7 !important;
  font-weight: bold;
}
</style>

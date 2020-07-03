<template>
  <div class="sales-funnel__setting">
    <div class="sales-funnel__setting-btn">
      <b-button
        type="is-light"
        @click="openSetting"
        :style="{ marginRight: '10px' }"
      >
        Настроить воронку
      </b-button>
      <b-button type="is-primary" @click="addLead">
        <b-icon pack="fas" icon="plus" size="is-small"> </b-icon>
        Добавить сделку
      </b-button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Setting",
  props: {
    name: String
  },
  data: () => ({
    isOpen: false,
    lastMessage: false,
    selectedSort: "",
    nameSaleFunnel: ""
  }),
  methods: {
    openSetting() {
      router.push({
        path: `/sales-and-marketing/sale-funnel/${this.name}/setting`
      });
    },
    addLead(){
      router.push({
        path: `/sales-and-marketing/sale-funnel/${this.name}/add-lead/`
      })
    }
  }
};
</script>

<style lang="scss">
.sales-funnel {
  &__setting {
    display: flex;
    align-items: center;
  }

  &__setting-btn {
    display: flex;
    padding: 0 5px 5px 5px;
    cursor: pointer;
  }

  &__setting-btn-open {
    padding: 5px 10px;
    background-color: #f1f1f2;
    margin: auto 0;
    border: 1px solid lightgray;
    border-radius: 3px;
    text-transform: uppercase;
    width: max-content;
    font-size: 14px;
  }

  &__settings:hover {
    cursor: pointer;
  }
}
</style>

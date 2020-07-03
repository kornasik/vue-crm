<template>
  <div class="item-menu-sales-funnel-list">
    <b-menu-item
      :label="item.name"
      class="item-menu-sales-funnel-list__list-sales-funnel"
      @click="openFunnel(item, $event)"
      v-if="!edit"
    />
    <div class="item-menu-sales-funnel-list__actions-item-menu" v-if="!edit">
      <b-icon
        pack="fas"
        icon="edit"
        type="is-success"
        @click.native="edit = true"
      />
      <b-icon
        pack="fas"
        icon="trash"
        type="is-danger"
        @click.native="deleteSaleFunnel"
      />
    </div>
    <input
      v-model="item.name"
      class="item-menu-sales-funnel-list__list-sales-funnel_edit"
      v-if="edit"
    />
    <div class="item-menu-sales-funnel-list__actions-item-menu" v-if="edit">
      <b-icon
        pack="fas"
        icon="check"
        type="is-success"
        @click.native="editSaleFunnel"
      />
      <b-icon
        pack="fas"
        icon="times"
        type="is-danger"
        @click.native="edit = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import router from "../../../router";

import Vue from "vue";
import Component from "vue-class-component";
@Component({
  props: {
    item: Object
  }
})
export default class SalesFunnel extends Vue {
  item: any;
  listStagesFunnel: any = [];
  edit: any = false;

  openFunnel() {
    router.push({
      path: `/sales-and-marketing/contacts/${this.item.id}`
    });
  }

  editSaleFunnel() {
    this.$emit("emitEditSaleFunnel", {
      id: this.item.id,
      name: this.item.name
    });
    this.edit = !this.edit;
  }

  deleteSaleFunnel() {
    this.$emit("emitDeleteSaleFunnel", this.item.id);
  }
}
</script>
<style scoped lang="scss">
.item-menu-sales-funnel-list {
  display: flex;
  justify-content: space-between;
  width: 300px;
  &__list-sales-funnel_edit {
    width: 200px;
    height: 36px;
  }
}
</style>

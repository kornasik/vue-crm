<template>
  <div>
    <Breadcrumbs />
    <section class="container-fluid">
      <Header
        :name="group && group.name ? group.name : ''"
        :isDisabled="true"
      />
      <Table v-if="modules" :modules="modules" ref="table" />
      <b-loading
        :is-full-page="false"
        :active.sync="isLoading"
        :can-cancel="true"
      />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import { Getter, Action } from "vuex-class";
import PermissionsGroupBase from "./permissions-group-base.mixin";

@Component({})
export default class PermissionsGroupAddView extends mixins(
  PermissionsGroupBase
) {
  @Getter("OPENED_GROUP") group: any;

  @Action("GET_PERMISSIONS_GROUP_BY_ID") getGroupById: any;

  async created() {
    const id = +this.$route.params.id;
    await this.getGroupById(id);
    this.isLoading = false;
    this.modules = this.group.modules;
  }
}
</script>
<style lang="scss" scoped>
.centered {
  margin: 0 auto;
}
.button-add {
  padding-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>

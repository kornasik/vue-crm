<template>
  <div>
    <Breadcrumbs />
    <section class="container-fluid">
      <HeaderUser :name="user.name" :isDisabled="true" />
      <Table :modules="user.modules" :isDisabled="true" ref="table" />
    </section>
    <b-loading
        :is-full-page="false"
        :active.sync="isLoading"
        :can-cancel="true"
      />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import HeaderUser from "@/components/permissions/components/HeaderUser.vue";
import Table from "@/components/permissions/components/Table.vue";
import { Getter, Action } from "vuex-class";

@Component({
  components: {
    Breadcrumbs,
    HeaderUser,
    Table
  }
})
export default class PermissionsUserView extends Vue {
  @Getter("OPENED_USER") user: any;
  @Action("GET_PERMISSIONS_USER_BY_ID") getUserById: any;
  isLoading: Boolean = true;

  async created() {
    const id = +this.$route.params.id;
    await this.getUserById(id);
    this.isLoading = false;
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

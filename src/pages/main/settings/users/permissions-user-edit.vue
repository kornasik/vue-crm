<template>
  <div>
    <Breadcrumbs />
    <section class="container-fluid">
      <HeaderUser
        :name="$v.name.$model"
        :groups="groups"
        :isError="$v.name.$error"
        :isModulesChanged="isModulesChanged"
        :isAllowTableEditing="isAllowTableEditing"
        :idSelectedGroup="idSelectedGroup"
        @deselectActionsInAllModules="deselectActionsInAllModules()"
        @selectActionsInAllModules="selectActionsInAllModules()"
        @undoActionsSelection="makeActionsDefault()"
        @updateName="$v.name.$model = $event"
        @allowTableEditing="handleAllowTableEditing($event)"
        @selectGroup="handleSelectGroup($event)"
      />
      <Table
        :modules="modules"
        :isDisabled="!isAllowTableEditing"
        ref="table"
      />
      <div class="buttons button-add">
        <b-button
          @click="handleEditUser()"
          :disabled="$v.name.$error"
          :type="$v.name.$error ? '' : 'is-success'"
          >{{ $t("usersEdit.editUser") }}</b-button
        >
      </div>
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
import { PermissionsModule } from "@/shared/classes/permissionsModule.model";
import { PermissionsGroup } from "@/shared/classes/permissionsGroup.model";
import { PermissionsUser } from "@/shared/classes/permissionsUser.model";
import PermissionsUserBase from "./permissions-user-base.mixin";
@Component({})
export default class PermissionsUserEditView extends mixins(
  PermissionsUserBase
) {
  @Getter("OPENED_USER") user: any;
  @Getter("PERMISSIONS_GROUPS") groups: any;

  @Action("GET_PERMISSIONS_GROUPS") getGroups: any;
  @Action("GET_PERMISSIONS_USER_BY_ID") getUserById: any;
  @Action("UPDATE_PERMISSIONS_USER") updatePermissionsUser: any;
  @Action("GET_PERMISSIONS_USERS") getUser: any;

  selectedModules: PermissionsModule[] = [];
  isAllowTableEditing: boolean = false;
  idSelectedGroup: number = 0;

  async created() {
    this.getGroups();
    const id = +this.$route.params.id;
    await this.getUserById(id);
    this.isLoading = false;
    (this.$v as any).name.$model = this.user.name;
    this.idSelectedGroup = this.user.groupId;
    this.modules = JSON.parse(JSON.stringify(this.user.modules));
    this.selectedModules = JSON.parse(JSON.stringify(this.user.modules));
  }

  get isModulesChanged() {
    return (
      JSON.stringify(this.selectedModules) !== JSON.stringify(this.modules)
    );
  }

  makeActionsDefault() {
    this.modules = JSON.parse(JSON.stringify(this.user.modules));
  }

  handleAllowTableEditing(isAllow: boolean): void {
    this.isAllowTableEditing = isAllow;
  }

  handleSelectGroup(idSelectedGroup: number): void {
    const indexSelectedGroup = this.groups.findIndex(
      (g: PermissionsGroup) => g.id === idSelectedGroup
    );
    this.modules = this.groups[indexSelectedGroup].modules;
    this.selectedModules = this.groups[indexSelectedGroup].modules;
  }

  async handleEditUser() {
    if (!(this.$v as any).name.$invalid) {
      const updatedUser: PermissionsUser = new PermissionsUser(
        this.user.id,
        this.name,
        this.modules,
        this.idSelectedGroup
      );
      await this.updatePermissionsUser(updatedUser);
      this.$router.go(-1);
    } else {
      this.$v.$touch();
    }
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

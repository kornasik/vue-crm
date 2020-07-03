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
          @click="handleAddNewUser()"
          :disabled="$v.name.$error"
          :type="$v.name.$error ? '' : 'is-success'"
          >{{ $t("usersAdd.addUser") }}</b-button
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
import HeaderUser from "@/components/permissions/components/HeaderUser.vue";
import Table from "@/components/permissions/components/Table.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {
  PERMISSIONS_MULTIPLE,
  PERMISSIONS_ACTIONS
} from "@/shared/constants/permissions";
import { Validate } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";
import { Getter, Action } from "vuex-class";
import { PermissionsGroup } from "@/shared/classes/permissionsGroup.model";
import { PermissionsModule } from "@/shared/classes/permissionsModule.model";
import { PermissionsUser } from "@/shared/classes/permissionsUser.model";
import PermissionsUserBase from "./permissions-user-base.mixin";
@Component({})
export default class PermissionsUserAddView extends mixins(
  PermissionsUserBase
) {
  @Getter("PERMISSIONS_MODULES") defaultModules: any;
  @Getter("PERMISSIONS_GROUPS") defaultGroups: any;

  @Action("GET_PERMISSIONS_GROUPS") getGroups: any;
  @Action("GET_PERMISSIONS_MODULES") getModules: any;
  @Action("ADD_NEW_PERMISSIONS_USER") addNewPermissionsUser: any;

  permissions = PERMISSIONS_MULTIPLE;
  groups: PermissionsGroup[] = [];
  selectedModules: PermissionsModule[] = [];
  isAllowTableEditing: boolean = false;
  idSelectedGroup: number = 0;

  async created() {
    await this.getGroups();
    await this.getModules();
    this.isLoading = false;
    this.groups = this.defaultGroups;
    this.makeActionsDefault();
  }

  get isModulesChanged() {
    return (
      JSON.stringify(this.selectedModules) !== JSON.stringify(this.modules)
    );
  }

  makeActionsDefault() {
    this.modules = JSON.parse(JSON.stringify(this.defaultModules));
    this.selectedModules = JSON.parse(JSON.stringify(this.defaultModules));
  }

  handleAllowTableEditing(isAllow: boolean): void {
    this.isAllowTableEditing = isAllow;
  }

  handleSelectGroup(idSelectedGroup: number): void {
    this.idSelectedGroup = idSelectedGroup;
    const indexSelectedGroup = this.groups.findIndex(
      (g: PermissionsGroup) => g.id === idSelectedGroup
    );
    this.modules = this.groups[indexSelectedGroup].modules;
    this.selectedModules = this.groups[indexSelectedGroup].modules;
  }

  async handleAddNewUser() {
    if (!(this.$v as any).name.$invalid) {
      const newUser: PermissionsUser = new PermissionsUser(
        0,
        this.name,
        this.modules,
        this.idSelectedGroup
      );
      await this.addNewPermissionsUser(newUser);
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

<template>
  <div>
    <Breadcrumbs />
    <section class="container-fluid">
      <Header
        :name="$v.name.$model"
        :isError="$v.name.$error"
        :isShowUndoButton="isModulesChanged"
        @deselectActionsInAllModulesEvent="deselectActionsInAllModules()"
        @selectActionsInAllModulesEvent="selectActionsInAllModules()"
        @addNewGroupEvent="addNewGroup()"
        @undoActionsSelectionEvent="makeActionsDefault()"
        @updateName="handleUpdateName"
      />
      <Table v-if="modules" :modules="modules" ref="table" />

      <div class="buttons button-add">
        <b-button
          @click="addNewGroup()"
          :disabled="$v.name.$error"
          :type="$v.name.$error ? '' : 'is-success'"
          >{{ $t("permissionsGroupsAdd.addGroup") }}</b-button
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
import { PermissionsGroup } from "@/shared/classes/permissionsGroup.model";
import PermissionsGroupBase from "./permissions-group-base.mixin";
@Component({})
export default class PermissionsGroupAddView extends mixins(
  PermissionsGroupBase
) {
  @Getter("PERMISSIONS_MODULES") defaultModules: any;

  @Action("GET_PERMISSIONS_MODULES") getModules: any;
  @Action("ADD_NEW_PERMISSIONS_GROUP") addNewPermissionsGroup: any;

  async created() {
    await this.getModules();
    this.isLoading = false;
    this.makeActionsDefault();
  }

  get isModulesChanged() {
    return JSON.stringify(this.defaultModules) !== JSON.stringify(this.modules);
  }

  handleUpdateName(changedName: any) {
    (this.$v as any).name.$model = changedName;
  }

  async addNewGroup() {
    if (!(this.$v as any).name.$invalid) {
      const newGroup: PermissionsGroup = new PermissionsGroup(
        0,
        this.name,
        this.modules
      );
      await this.addNewPermissionsGroup(newGroup);
      this.$router.go(-1);
    } else {
      this.$v.$touch();
    }
  }

  makeActionsDefault() {
    this.modules = JSON.parse(JSON.stringify(this.defaultModules));
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

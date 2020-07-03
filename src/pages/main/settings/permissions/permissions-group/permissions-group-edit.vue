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
        @update:name="$v.name.$model = $event"
      />
      <Table v-if="modules" :modules="modules" ref="table" />

      <div class="buttons button-add">
        <b-button
          @click="updateGroup()"
          :disabled="$v.name.$error"
          :type="$v.name.$error ? '' : 'is-success'"
          >{{ $t("permissionsGroupsEdit.saveGroup") }}</b-button
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
import { showToast_success } from "@/shared/notifications";

@Component({})
export default class PermissionsGroupAddView extends mixins(
  PermissionsGroupBase
) {
  @Getter("OPENED_GROUP") group: any;

  @Action("GET_PERMISSIONS_GROUP_BY_ID") getGroupById: any;
  @Action("UPDATE_PERMISSIONS_GROUP") updatePermissionsGroup: any;

  async created() {
    const id = +this.$route.params.id;
    await this.getGroupById(id);
    this.isLoading = false;
    this.name = this.group.name;
    this.makeActionsDefault();
  }

  get isModulesChanged() {
    if (this.group && this.group.modules && this.modules) {
      return (
        JSON.stringify(this.group.modules) !== JSON.stringify(this.modules)
      );
    }
    return false;
  }

  async updateGroup() {
    if (!(this.$v as any).name.$invalid) {
      const updatedGroup: PermissionsGroup = new PermissionsGroup(
        this.group.id,
        this.name,
        this.modules
      );
      await this.updatePermissionsGroup(updatedGroup);
      showToast_success((this.$t as any).permissionsGroupsEdit.updated);
      this.$router.go(-1);
    } else {
      this.$v.$touch();
    }
  }

  makeActionsDefault() {
    this.modules = JSON.parse(JSON.stringify(this.group.modules));
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

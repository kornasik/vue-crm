<template>
  <div class="columns">
    <div class="column fields">
      <b-field
        :type="isError ? 'is-danger' : 'is-success'"
        :message="isError ? $t('usersAdd.requiredField') : ''"
      >
        <b-input
          type="text"
          :value="name"
          @input="updateName"
          :placeholder="$t('usersAdd.user')"
          :disabled="isDisabled"
        ></b-input>
      </b-field>
      <b-select
        v-if="!isDisabled"
        v-model="selectValue"
        :placeholder="$t('usersAdd.selectExistingRole')"
        @input="emitSelectedGroup"
      >
        <option v-for="(group, i) in groups" v-bind:key="i" :value="group.id">{{
          group.name
        }}</option>
      </b-select>
      <b-switch
        v-if="!isDisabled"
        :value="isAllowTableEditing"
        @input="emitAllowTableEditing($event)"
      >
        {{ $t("usersAdd.advancedSetup") }}
      </b-switch>
    </div>
    <div class="column">
      <div class="buttons is-pulled-right">
        <b-button
          v-if="isShowButtonUndoChanges"
          type="is-info"
          outlined
          icon-pack="fas"
          icon-right="redo-alt"
          @click="emitUndoSelection()"
        >
          {{ $t("usersAdd.clear") }}
        </b-button>
        <b-button
          v-if="!isDisabled"
          type="is-light"
          icon-right="tasks"
          icon-pack="fas"
          :disabled="!isAllowTableEditing"
          @click="emitSelectActionsInAllModules()"
          >{{ $t("usersAdd.selectAll") }}</b-button
        >
        <b-button
          v-if="!isDisabled"
          type="is-light"
          icon-right="list-ul"
          icon-pack="fas"
          :disabled="!isAllowTableEditing"
          @click="emitDeselectActionsInAllModules()"
          >{{ $t("usersAdd.deselectAll") }}</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, PropSync, Emit, Watch } from "vue-property-decorator";
@Component({})
export default class PermissionsGroupHeader extends Vue {
  @Prop({ default: String }) name!: string;
  @Prop({ default: false }) isError!: boolean;
  @Prop({ default: false }) isModulesChanged!: boolean;
  @Prop({ default: false }) isDisabled!: Boolean;
  @Prop({ default: false }) isAllowTableEditing!: Boolean;
  @Prop({ default: () => [] }) groups!: [];
  @Prop({ default: 0 }) idSelectedGroup!: number;

  selectValue: number | null = null;

  @Watch("idSelectedGroup")
  handleChangingId() {
    this.selectValue = this.idSelectedGroup;
  }

  get isShowButtonUndoChanges() {
    return this.isModulesChanged && this.isAllowTableEditing;
  }

  @Emit("selectActionsInAllModules")
  emitSelectActionsInAllModules() {
    return;
  }

  @Emit("deselectActionsInAllModules")
  emitDeselectActionsInAllModules(): void {
    return;
  }

  @Emit("addNewUser")
  emitAddNewGroup(): void {
    return;
  }

  @Emit("updateName")
  updateName(name: string) {
    return name;
  }

  @Emit("undoActionsSelection")
  emitUndoSelection(): void {
    return;
  }

  @Emit("selectGroup")
  emitSelectedGroup(groupId: number): number {
    return groupId;
  }

  @Emit("allowTableEditing")
  emitAllowTableEditing(isAllow: boolean): boolean {
    return isAllow;
  }
}
</script>
<style lang="scss" scoped>
.fields {
  display: flex;
  justify-content: space-between;
}
</style>

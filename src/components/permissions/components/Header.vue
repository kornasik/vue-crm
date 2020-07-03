<template>
  <div class="columns">
    <div class="column">
      <o-field
        :type="isError ? 'is-danger' : 'is-success'"
        :message="isError ? $t('permissionsGroupsAdd.nameLabelError') : ''"
      >
        <o-input
          type="text"
          :value="name"
          @input="updateName"
          :placeholder="$t('permissionsGroupsAdd.nameLabel')"
          :disabled="isDisabled"
        />
      </o-field>
    </div>
    <div class="column">
      <div class="buttons is-pulled-right">
        <b-button
          v-if="isShowUndoButton"
          type="is-info"
          outlined
          icon-pack="fas"
          icon-right="redo-alt"
          @click="emitUndoSelection()"
        >
          {{ $t("permissionsGroupsAdd.clear") }}
        </b-button>
        <b-button
          v-if="!isDisabled"
          type="is-light"
          icon-right="tasks"
          icon-pack="fas"
          @click="emitSelectActionsInAllModules()"
          >{{ $t("permissionsGroupsAdd.selectAll") }}</b-button
        >
        <b-button
          v-if="!isDisabled"
          type="is-light"
          icon-right="list-ul"
          icon-pack="fas"
          @click="emitDeselectActionsInAllModules()"
          >{{ $t("permissionsGroupsAdd.deselectAll") }}</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OInput from "@/components/shared/OInput/OInput.vue";
import OField from "@/components/shared/OField/OField.vue";
import { Prop, PropSync, Emit } from "vue-property-decorator";
@Component({
  components: {
    OInput,
    OField
  }
})
export default class PermissionsGroupHeader extends Vue {
  @Prop({ default: String }) name!: string;
  @Prop({ default: false }) isError!: boolean;
  @Prop({ default: false }) isShowUndoButton!: boolean;
  @Prop({ default: false }) isDisabled!: Boolean;

  @Emit("selectActionsInAllModulesEvent")
  emitSelectActionsInAllModules() {
    return;
  }

  @Emit("deselectActionsInAllModulesEvent")
  emitDeselectActionsInAllModules(): void {
    return;
  }

  @Emit("addNewGroupEvent")
  emitAddNewGroup(): void {
    return;
  }

  @Emit("updateName")
  updateName(name: string) {
    return name;
  }

  @Emit("undoActionsSelectionEvent")
  emitUndoSelection(): void {
    return;
  }
}
</script>

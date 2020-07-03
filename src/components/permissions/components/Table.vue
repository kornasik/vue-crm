<template>
  <div>
    <b-table
      v-if="modules && columnsVisible"
      :data="modules"
      ref="table"
      detailed
      hoverable
      bordered
      custom-detail-row
      :opened-detailed="['Module name']"
      detail-key="name"
      icon-pack="fas"
    >
      <template slot-scope="props">
        <b-table-column
          field="modules"
          :label="columnsVisible['modules'].title"
          width="300"
        >
          <a @click="toggle(props.row)">
            {{ props.row.name }}
          </a>
        </b-table-column>

        <b-table-column
          field="function"
          :label="columnsVisible['function'].title"
          centered
        >
          <b-checkbox
            :disabled="isDisabled"
            :value="isModuleSelected(props.index)"
            @input="toggleActionsInModule($event, props.index)"
          />
        </b-table-column>

        <b-table-column
          field="add"
          :label="columnsVisible['add'].title"
          centered
        >
          <b-checkbox
            :disabled="isDisabled"
            :value="
              isColumnSelectedInModule(props.index, permissionActions.ADD)
            "
            @input="
              toggleModuleActionsInColumn(
                $event,
                props.index,
                permissionActions.ADD
              )
            "
          />
        </b-table-column>

        <b-table-column
          field="edit"
          :label="columnsVisible['edit'].title"
          centered
        >
          <b-checkbox
            :disabled="isDisabled"
            :value="
              isColumnSelectedInModule(props.index, permissionActions.EDIT)
            "
            @input="
              toggleModuleActionsInColumn(
                $event,
                props.index,
                permissionActions.EDIT
              )
            "
          />
        </b-table-column>

        <b-table-column
          field="delete"
          :label="columnsVisible['delete'].title"
          centered
        >
          <b-checkbox
            :disabled="isDisabled"
            :value="
              isColumnSelectedInModule(props.index, permissionActions.DELETE)
            "
            @input="
              toggleModuleActionsInColumn(
                $event,
                props.index,
                permissionActions.DELETE
              )
            "
          />
        </b-table-column>
        <b-table-column
          field="view"
          :label="columnsVisible['view'].title"
          centered
        >
          <b-checkbox
            :disabled="isDisabled"
            :value="
              isColumnSelectedInModule(props.index, permissionActions.VIEW)
            "
            @input="
              toggleModuleActionsInColumn(
                $event,
                props.index,
                permissionActions.VIEW
              )
            "
          />
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <tr v-for="(item, i) in props.row.functions" :key="i + '-' + item.name">
          <td></td>
          <td></td>
          <td class="centered">
            <b-checkbox
              :disabled="isDisabled"
              :value="isActionsSelectedInRow(props.index, i)"
              @input="toggleActionsInRow($event, props.index, i)"
            />
            {{ item.name }}
          </td>
          <td
            class="centered"
            v-for="(action, i) in item.actions"
            :key="i + '-action-' + action.name"
          >
            {{ item.actions[i] }}
            <template v-if="isActionMultiple(item.type)">
              <b-select
                :disabled="isDisabled"
                class="centered"
                :placeholder="$t('tableWithPermissions.selectPermissionLevel')"
                v-model="item.actions[i]"
              >
                <option :value="permissionsMultiple.all.id">
                  {{ permissionsMultiple.all.name }}
                </option>
                <option :value="permissionsMultiple.own.id">
                  {{ permissionsMultiple.own.name }}
                </option>
                <option :value="permissionsMultiple.noAccess.id">
                  {{ permissionsMultiple.noAccess.name }}
                </option>
              </b-select>
            </template>
            <template v-else>
              <div>
                {{ item.actions[i] }}
                <b-checkbox
                  :disabled="isDisabled"
                  :true-value="1"
                  :false-value="0"
                  :value="item.actions[i]"
                  @input="item.actions[i] = $event"
                />
              </div>
            </template>
          </td>
        </tr>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, PropSync, Emit } from "vue-property-decorator";
import {
  PERMISSIONS_ACTIONS,
  PERMISSIONS_MULTIPLE,
  FUNCTION_TYPES,
  PERMISSIONS_SIMPLE
} from "@/shared/constants/permissions";
import { PermissionsFunction } from "@/shared/classes/permissionsFunction.model";
import { PermissionsModule } from "@/shared/classes/permissionsModule.model";
@Component({})
export default class PermissionsGroupHeader extends Vue {
  @Prop({ default: [] }) modules!: any[];
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
  permissionActions = PERMISSIONS_ACTIONS;
  permissionsMultiple = PERMISSIONS_MULTIPLE;

  updateName(name: string) {
    this.$emit("update:name", name);
  }

  columnsVisible: any = null;

  created() {
    this.columnsVisible = {
      modules: {
        title: this.$t("tableWithPermissions.modules"),
        display: true
      },
      function: {
        title: this.$t("tableWithPermissions.functions"),
        display: true
      },
      add: {
        title: this.$t("tableWithPermissions.add"),
        display: true
      },
      edit: {
        title: this.$t("tableWithPermissions.edit"),
        display: true
      },
      delete: {
        title: this.$t("tableWithPermissions.delete"),
        display: true
      },
      view: {
        title: this.$t("tableWithPermissions.view"),
        display: true
      }
    };
  }

  toggle(row: any): void {
    (this.$refs.table as any).toggleDetails(row);
  }

  isActionsSelectedInRow(moduleIndex: number, rowIndex: number): boolean {
    const permissionFunction: PermissionsFunction = this.modules[moduleIndex]
      .functions[rowIndex];
    const actionsValues: number[] = Object.values(permissionFunction.actions);
    for (let i = 0; i < actionsValues.length; i++) {
      if (!this.isActionSwitchOn(actionsValues[i], permissionFunction.type)) {
        return false;
      }
    }
    return true;
  }

  isActionSwitchOn(action: number, functionType: FUNCTION_TYPES): boolean {
    switch (functionType) {
      case FUNCTION_TYPES.MUPLITPLE: {
        return action === PERMISSIONS_MULTIPLE.all.id;
      }
      case FUNCTION_TYPES.SINGLE: {
        return action === PERMISSIONS_SIMPLE.all.id;
      }
    }
    return false;
  }

  toggleActionsInRow(
    checkboxValue: boolean,
    moduleIndex: number,
    rowIndex: number
  ): void {
    let actions: number[] = this.modules[moduleIndex].functions[rowIndex]
      .actions;
    const newActionValue: number = this.getActionValue(
      checkboxValue,
      this.modules[moduleIndex].functions[rowIndex].type
    );
    this.modules[moduleIndex].functions[rowIndex].actions = this.objectMap(
      actions,
      (action: number) => newActionValue
    );
  }

  toggleModuleActionsInColumn(
    checkboxValue: boolean,
    moduleIndex: number,
    actionName: PERMISSIONS_ACTIONS
  ) {
    const functions: PermissionsFunction[] = this.modules[moduleIndex]
      .functions;
    for (let i = 0; i < functions.length; i++) {
      const newActionValue: number = this.getActionValue(
        checkboxValue,
        functions[i].type
      );
      this.modules[moduleIndex].functions[i].actions[
        actionName
      ] = newActionValue;
    }
    // TODO: check another possibilities
    this.modules[moduleIndex].functions = this.modules[
      moduleIndex
    ].functions.map((a: PermissionsFunction) => a);
  }

  toggleActionsInModule(checkboxValue: boolean, moduleIndex: number) {
    const module: PermissionsModule = this.modules[moduleIndex];
    for (let i = 0; i < module.functions.length; i++) {
      // TODO: check another possibilities
      const newActionValue: number = this.getActionValue(
        checkboxValue,
        module.functions[i].type
      );
      module.functions[i].actions = this.objectMap(
        module.functions[i].actions,
        (action: number) => newActionValue
      );
    }
  }

  selectActionsInAllModules() {
    for (let i = 0; i < this.modules.length; i++) {
      for (let j = 0; j < this.modules[i].functions.length; j++) {
        const actions = this.modules[i].functions[j].actions;
        const newActionValue: number = this.getActionValue(
          true,
          this.modules[i].functions[j].type
        );
        this.modules[i].functions[j].actions = this.objectMap(
          actions,
          (action: number) => newActionValue
        );
      }
    }
  }

  deselectActionsInAllModules() {
    for (let i = 0; i < this.modules.length; i++) {
      for (let j = 0; j < this.modules[i].functions.length; j++) {
        const newActionValue: number = this.getActionValue(
          false,
          this.modules[i].functions[j].type
        );
        const actions = this.modules[i].functions[j].actions;
        this.modules[i].functions[j].actions = this.objectMap(
          actions,
          (action: number) => this.permissionsMultiple.noAccess.id
        );
      }
    }
  }

  getActionValue(checkboxValue: boolean, functionType: FUNCTION_TYPES): number {
    let newActionValue: number = -1;
    if (checkboxValue) {
      newActionValue = this.isActionMultiple(functionType)
        ? PERMISSIONS_MULTIPLE.all.id
        : PERMISSIONS_SIMPLE.all.id;
    } else {
      newActionValue = PERMISSIONS_SIMPLE.noAccess.id;
    }
    return newActionValue;
  }

  objectMap(object: any, mapFn: Function) {
    return Object.keys(object).reduce((result: any, key: any) => {
      result[key] = mapFn(object[key]);
      return result;
    }, {});
  }

  isColumnSelectedInModule(
    moduleIndex: number,
    actionName: PERMISSIONS_ACTIONS
  ): boolean {
    const functions: PermissionsFunction[] = this.modules[moduleIndex]
      .functions;
    for (let i = 0; i < functions.length; i++) {
      if (
        !this.isActionSwitchOn(
          functions[i].actions[actionName],
          functions[i].type
        )
      ) {
        return false;
      }
    }
    return true;
  }

  isModuleSelected(moduleIndex: number) {
    let isSelected: boolean = true;
    const module: PermissionsModule = this.modules[moduleIndex];
    module.functions.forEach((func: PermissionsFunction) => {
      const actionsValues: number[] = Object.values(func.actions);
      for (let i = 0; i < actionsValues.length; i++) {
        if (!this.isActionSwitchOn(actionsValues[i], func.type)) {
          isSelected = false;
          return false;
        }
      }
    });
    return isSelected;
  }

  isActionMultiple(type: FUNCTION_TYPES) {
    return type === FUNCTION_TYPES.MUPLITPLE;
  }
}
</script>
<style lang="scss" scoped>
.centered {
  margin: 0 auto;
}
</style>

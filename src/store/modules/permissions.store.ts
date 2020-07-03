// TODO: add to index api
import {
  getPermissionsGroupsList,
  addPermissionsGroup,
  deletePermissionsGroupById,
  getPermissionsGroupById,
  updatePermissionsGroup
} from "@/api/permissions-groups.api";
import { PermissionsGroup } from "@/shared/classes/permissionsGroup.model";
import { getPermissionsModulesList } from "@/api/permissions-modules.api";
import { PermissionsModule } from "@/shared/classes/permissionsModule.model";

const state = {
  permissionsGroups: [],
  permissionsModules: [],
  openedGroup: null
};

export default function(api: any) {
  return {
    // namespaced: true,
    state,
    getters: {
      PERMISSIONS_GROUPS: function(state: any) {
        return state.permissionsGroups;
      },
      PERMISSIONS_MODULES: function(state: any) {
        return state.permissionsModules;
      },
      OPENED_GROUP: function(state: any) {
        return state.openedGroup;
      }
    },
    actions: {
      GET_PERMISSIONS_GROUPS: async (context: any, payload: any) => {
        const groups = ((await getPermissionsGroupsList()) as any).groups;
        context.commit("SET_PERMISSIONS_GROUPS", groups);
      },
      ADD_NEW_PERMISSIONS_GROUP: async (
        context: any,
        newGroup: PermissionsGroup
      ) => {
        try {
          const createdGroup = await addPermissionsGroup(newGroup);
          newGroup.setId(createdGroup.id);
        } catch (err) {
          console.log(state.permissionsGroups.length + 1);
          newGroup.setId(state.permissionsGroups.length + 1 || 1);
        }
        context.commit("SET_NEW_PERMISSIONS_GROUP", newGroup);
      },
      UPDATE_PERMISSIONS_GROUP: async (
        context: any,
        updatedGroup: PermissionsGroup
      ) => {
        let idUpdatedGroup: number = 0;
        try {
          idUpdatedGroup = ((await updatePermissionsGroup(updatedGroup)) as any)
            .id;
        } catch (err) {
          idUpdatedGroup = updatedGroup.id;
        }
        if (idUpdatedGroup) {
          context.commit("SAVE_UPDATED_PERMISSIONS_GROUP", updatedGroup);
        }
      },
      DELETE_PERMISSIONS_GROUP_BY_ID: async (context: any, id: number) => {
        try {
          await deletePermissionsGroupById(id);
        } catch (err) {
          console.log(err);
        }
        context.commit("DELETE_PERMISSIONS_GROUP", id);
      },
      GET_PERMISSIONS_MODULES: async (context: any, payload: any) => {
        const modules = ((await getPermissionsModulesList()) as any).modules;
        context.commit("SET_PERMISSIONS_MODULES", modules);
      },
      GET_PERMISSIONS_GROUP_BY_ID: async (context: any, id: number) => {
        let group = null;
        try {
          group = ((await getPermissionsGroupById(id)) as any).group;
        } catch (err) {
          const groups = JSON.parse(
            localStorage.getItem("permissionsGroupsresponse") as string
          );
          group = groups.groups.filter(
            (group: PermissionsGroup) => group.id === id
          )[0];
        }
        context.commit("SET_OPENED_PERMISSIONS_GROUP", group);
      }
    },
    mutations: {
      SET_PERMISSIONS_GROUPS: (state: any, groups: PermissionsGroup[]) => {
        state.permissionsGroups = groups;
      },
      SET_NEW_PERMISSIONS_GROUP: (state: any, newGroup: PermissionsGroup) => {
        let groups = JSON.parse(
          localStorage.getItem("permissionsGroupsresponse") as string
        );
        groups.groups.push(newGroup);
        localStorage.setItem(
          "permissionsGroupsresponse",
          JSON.stringify(groups)
        );
        state.permissionsGroups.push(newGroup);
      },
      SET_PERMISSIONS_MODULES: (state: any, modules: PermissionsModule[]) => {
        state.permissionsModules = modules;
      },
      DELETE_PERMISSIONS_GROUP: (state: any, id: number) => {
        let groups = JSON.parse(
          localStorage.getItem("permissionsGroupsresponse") as string
        );
        groups.groups = groups.groups.filter(
          (group: PermissionsGroup) => group.id !== id
        );
        localStorage.setItem(
          "permissionsGroupsresponse",
          JSON.stringify(groups)
        );
        state.permissionsGroups = groups.groups;
      },
      SET_OPENED_PERMISSIONS_GROUP: (state: any, group: PermissionsGroup) => {
        state.openedGroup = group;
      },
      SAVE_UPDATED_PERMISSIONS_GROUP: (
        state: any,
        updatedGroup: PermissionsGroup
      ) => {
        let groups = JSON.parse(
          localStorage.getItem("permissionsGroupsresponse") as string
        );
        const indexForUpdate = groups.groups.findIndex(
          (group: PermissionsGroup) => group.id === updatedGroup.id
        );
        groups.groups[indexForUpdate] = updatedGroup;
        localStorage.setItem(
          "permissionsGroupsresponse",
          JSON.stringify(groups)
        );
        state.permissionsGroups[indexForUpdate] = updatedGroup;
      }
    }
  };
}

import { PermissionsUserState } from '@/shared/classes/store/PermissionsUserState.model';
import { PermissionsUser } from '@/shared/classes/permissionsUser.model';
import { getPermissionsUsersList, addPermissionsUser, getPermissionsUserById, updatePermissionsUser, deletePermissionsUserById } from '@/api/permissions-users.api';

export default function(api: any) {
    return {
      namespaced: true,
      state: {
        permissionsUsers: [],
        permissionsModules: [],
        openedUser: null
      },
      actions: {
        GET_PERMISSIONS_USERS: async (context: any, payload: any) => {
          const usersResponse: any = await getPermissionsUsersList();
          context.commit("SET_PERMISSIONS_USERS", usersResponse.users);
        },
        ADD_NEW_PERMISSIONS_USER: async (context: any, newUser: PermissionsUser) => {
          try {
            const createdGroup = await addPermissionsUser(newUser);
            newUser.setId(createdGroup.id);
          } catch (err) {
            const permissionsUserResponse = JSON.parse(
              localStorage.getItem("permissionsUsersResponse") as string
            );
            newUser.setId(permissionsUserResponse.users.length + 1 || 1);
          }
          context.commit("SET_NEW_PERMISSIONS_USER", newUser);
        },
        GET_PERMISSIONS_USER_BY_ID: async (context: any, id: number) => {
          let user = null;
          try {
            user = ((await getPermissionsUserById(id)) as any).user;
          } catch (err) {
            const permissionsUserResponse = JSON.parse(
              localStorage.getItem("permissionsUsersResponse") as string
            );
            [user] = permissionsUserResponse.users.filter(
              (user: PermissionsUser) => user.id === id
            );
          }
          context.commit("SET_OPENED_PERMISSIONS_USER", user);
        },
        UPDATE_PERMISSIONS_USER: async (
          context: any,
          updatedUser: PermissionsUser
        ) => {
          let idUpdatedUser: number = 0;
          try {
            idUpdatedUser = ((await updatePermissionsUser(updatedUser)) as any).id;
          } catch (err) {
            idUpdatedUser = updatedUser.id;
          }
          if (idUpdatedUser) {
            context.commit("SAVE_UPDATED_PERMISSIONS_USER", updatedUser);
          }
        },
        DELETE_PERMISSIONS_USER_BY_ID: async (context: any, id: number) => {
          try {
            await deletePermissionsUserById(id);
          } catch (err) {
            console.log(err);
          }
          context.commit("DELETE_PERMISSIONS_USER", id);
        }
    },
    getters: {
        PERMISSIONS_USERS: function(state: PermissionsUserState) {
          return state.permissionsUsers;
        },
        OPENED_USER: function(state: PermissionsUserState) {
          return state.openedUser;
        }
      },
      mutations: {
        SET_PERMISSIONS_USERS: (
          state: PermissionsUserState,
          users: PermissionsUser[]
        ) => {
          state.permissionsUsers = users;
        },
        SET_NEW_PERMISSIONS_USER: (
          state: PermissionsUserState,
          newUser: PermissionsUser
        ) => {
          let users = JSON.parse(
            localStorage.getItem("permissionsUsersResponse") as string
          );
          users.users.push(newUser);
          localStorage.setItem("permissionsUsersResponse", JSON.stringify(users));
          state.permissionsUsers.push(newUser);
        },
        SET_OPENED_PERMISSIONS_USER: (
          state: PermissionsUserState,
          user: PermissionsUser
        ) => {
          state.openedUser = user;
        },
        DELETE_PERMISSIONS_USER: (state: PermissionsUserState, id: number) => {
          let permissionsUsersResponse = JSON.parse(
            localStorage.getItem("permissionsUsersResponse") as string
          );
          permissionsUsersResponse.users = permissionsUsersResponse.users.filter(
            (user: PermissionsUser) => user.id !== id
          );
          localStorage.setItem(
            "permissionsUsersResponse",
            JSON.stringify(permissionsUsersResponse)
          );
          state.permissionsUsers = permissionsUsersResponse.users;
        }
      }
  }
}
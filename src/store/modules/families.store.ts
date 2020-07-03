import {Family} from "@/shared/classes/family.model";
export default function(api: any) {
  return {
    namespaced: true,
    state: {
      families: null,
    },
    getters: {
      FAMILIES(state: any) {
        return state.families;
      }
    },
    actions: {
      GET_FAMILIES: async (context: any) => {
        context.commit(
          "SET_FAMILIES", (await api.families.getList()).data.families
        );
      }
    },
    mutations: {
      SET_FAMILIES: (state: any, families: Family[]) => {
        state.families = families;
      }
    }
  };
}

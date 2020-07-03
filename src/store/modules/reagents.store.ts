export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      reagents: null
    },
    getters: {
      REAGENTS: function (state: any) {
        return state.reagents;
      }
    },
    actions: {
      GET_REAGENTS: async (context: any, payload: any) => {
        context.commit("SET_REAGENTS", (await api.reagents.getList()).data.reagents);
      }
    },
    mutations: {
      SET_REAGENTS: (state: any, payload: any) => {
        state.reagents = payload;
      }
    }
  };
}

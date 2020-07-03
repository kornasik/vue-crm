export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      manipulations: null
    },
    getters: {
      MANIPULATIONS: function (state: any) {
        return state.manipulations;
      }
    },
    actions: {
      GET_MANIPULATIONS: async (context: any, payload: any) => {
        context.commit(
          "SET_MANIPULATIONS", (await api.manipulations.getList()).data.manipulations
        );
      }
    },
    mutations: {
      SET_MANIPULATIONS: (state: any, payload: any) => {
        state.manipulations = payload;
      }
    }
  };
}

export default function(api: any) {
  return {
    namespaced: true,
    state: {
      icds: []
    },
    getters: {
      icds_1: (state: any) => {
        return state.icds;
      }
    },
    actions: {
      getIcds: async (context: any) => {
        const resIcdList: any = await api.icd.getList();
        context.commit("SET_ICDS", resIcdList.data.icd10);
      },
      getLimitedIcds: async (context: any, limits: any) => {
        const resIcdList: any = await api.icd.getLimitedList(
          limits.from,
          limits.to
        );
        context.commit("SET_ICDS", resIcdList.data.icd10);
      }
    },
    mutations: {
      SET_ICDS(state: any, icds: any[]) {
        state.icds = icds;
      }
    }
  };
}

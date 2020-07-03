export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      categories: null
    },
    getters: {
      CATEGORIES: function(state: any) {
        return state.categories;
      }
    },
    actions: {
      GET_CATEGORIES: async (context: any, payload: any) => {
        const res = await api.complaintCategories.getList();
        context.commit("SET_CATEGORIES", res.data.categories);
      }
    },
    mutations: {
      SET_CATEGORIES: (state: any, payload: any) => {
        state.categories = payload;
      }
    }
  };
}

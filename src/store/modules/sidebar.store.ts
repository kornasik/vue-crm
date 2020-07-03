export default function(api: any) {
  return {
    namespaced: true,
    state: {
      isOpened: true
    },
    getters: {
      isOpen: function(state: any) {
        return state.isOpened;
      }
    },
    mutations: {
      toggle(state: any) {
        state.isOpened = !state.isOpened;
      }
    }
  };
}

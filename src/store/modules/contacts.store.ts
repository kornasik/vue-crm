export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      contactsList: []
    },
    mutations: {
      setContactsList(state: any, payload: any) {
        state.contactsList = payload;
      }
    }
  };
}

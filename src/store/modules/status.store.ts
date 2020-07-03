export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      filters: {
        doctors: {
          data: [],
          selected: []
        },
        referrals: {
          data: [],
          selected: []
        },
        dates: {
          data: [],
          selected: []
        },
        statuses: {
          data: [],
          selected: []
        },
        searchText: ""
      }
    },
    mutations: {
      udpateFilters(state: any, payload: any) {
        state.filters = JSON.parse(JSON.stringify(payload));
      }
    }
  };
}

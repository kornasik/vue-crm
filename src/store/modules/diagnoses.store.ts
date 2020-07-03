export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      diagnosesAssignmentList: {}
    },
    mutations: {
      changeDiagnosesAssignmentList(state: any, payload: any) {
        state.diagnosesAssignmentList[payload.number] = payload.value
      }
    }
  };
}

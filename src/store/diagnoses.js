export default {
  state: {
    diagnosesAssignmentList: {}
  },
  mutations: {
    changeDiagnosesAssignmentList(state, payload) {
      state.diagnosesAssignmentList[payload.number] = payload.value;
    }
  }
};

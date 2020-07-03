export default function(api: any) {
  return {
    //   namespaced: true,
    state: {
      selectedDoctors: [],
      selectedDates: [],
      listDoctors: [],
      isModalToRecord: false,
      listRecords: [],
      viewListRecords: []
    },
    getters: {
      getSelectedDates(state: any) {
        return state.selectedDates;
      },
      getListDoctors(state: any) {
        return state.listDoctors;
      },
      getSelectedDoctors(state: any) {
        return state.selectedDoctors;
      },
      getIsModalToRecord(state: any) {
        return state.isModalToRecord;
      },
      getViewListRecords(state: any) {
        return state.viewListRecords;
      },
      getListRecords(state: any) {
        return state.listRecords;
      }
    },
    mutations: {
      setSelectedDoctors(state: any, payload: number) {
        state.selectedDoctors = payload;
      },
      setSelectedDates(state: any, payload: object[]) {
        state.selectedDates = payload;
      },
      setListDoctors(state: any, payload: string[]) {
        state.listDoctors = payload;
      },
      setIsModalToRecord(state: any) {
        state.isModalToRecord = !state.isModalToRecord;
      },
      setListRecords(state: any, payload: object[]) {
        state.listRecords = payload;
      },
      setViewListRecords(state: any, payload: object[]) {
        state.viewListRecords = payload;
      }
    },
    actions: {
      async ActionListDoctors(state: any) {
        const res = await api.doctors.getList();
        state.commit(
          "setListDoctors",
          res.data.doctors.map((doctor: any) => doctor.name)
        );
      }
    }
  };
}


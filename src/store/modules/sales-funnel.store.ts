export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      filterTag: {
        status: "",
        tags: []
      },
      sortList: {
        lastMessage: false,
        lastEvent: false,
        createDate: false,
        name: false,
        budget: false
      },
      listFunnel: [],
      stagesFunnel: [],
      searchText: "",
      countOrders: 0,
      totalSumOrders: 0,
      todayTasks: 0,
      notTasksCount: 0,
      pastdueTasksCount: 0,
      newTodayTasksCount: 0,
      newYesterdayTasksCount: 0,
      isOpenFilter: false,
      idSalesFunnel: 0,
      nameSaleFunnel: "",
      listEditStageFunnel: [],
      notesList: []
    },
    getters: {
      getFilterTag: function(state: any) {
        return state.filterTag;
      },
      getSortList: function(state: any) {
        return state.sortList;
      },
      getListFunnel: function(state: any) {
        return state.listFunnel;
      },
      getStagesFunnel: function(state: any) {
        return state.stagesFunnel;
      },
      getSearchText: function(state: any) {
        return state.searchText;
      },
      getCountOrders: function(state: any) {
        return state.countOrders;
      },
      getTotalSumOrders: function(state: any) {
        return state.totalSumOrders;
      },
      getTodayTasks: function(state: any) {
        return state.todayTasks;
      },
      getNotTasksCount: function(state: any) {
        return state.notTasksCount;
      },
      getPastdueTasksCount: function(state: any) {
        return state.pastdueTasksCount;
      },
      getNewTodayTasksCount: function(state: any) {
        return state.newTodayTasksCount;
      },
      getNewYesterdayTasksCount: function(state: any) {
        return state.newYesterdayTasksCount;
      },
      getIsOpenFilter: function(state: any) {
        return state.isOpenFilter;
      },
      getIdSalesFunnel: function(state: any) {
        return state.idSalesFunnel;
      },
      getNameSaleFunnel: function (state: any) {
        return state.nameSaleFunnel;
      },
      getListEditStageFunnel: function(state: any) {
        return state.listEditStageFunnel;
      },
      getNotesList: function(state: any) {
        return state.notesList;
      }
    },
    mutations: {
      openFilter(state: any) {
        state.isOpenFilter = true;
      },
      closeFilter(state: any) {
        state.isOpenFilter = false;
      },
      setFilterTag(state: any, payload: any) {
        state.filterTag.status = payload;
      },
      setItemFilterTag(state: any, payload: any) {
        state.filterTag.tags = payload;
      },
      clearFilterTag(state: any) {
        state.filterTag.status = "";
        state.filterTag.tags = [];
      },
      deleteItemFilterTag(state: any, payload: any) {
        state.filterTag.tags = [
          ...state.filterTag.tags.slice(0, payload),
          ...state.filterTag.tags.splice(payload + 1)
        ];
      },
      sortListLastMessage(state: any) {
        state.sortList.lastMessage = !state.sortList.lastMessage;
      },
      sortListLastEvent(state: any) {
        state.sortList.lastEvent = !state.sortList.lastEvent;
      },
      sortListCreateDate(state: any) {
        state.sortList.createDate = !state.sortList.createDate;
      },
      sortListName(state: any) {
        state.sortList.name = !state.sortList.name;
      },
      sortListBudget(state: any) {
        state.sortList.budget = !state.sortList.budget;
      },
      setIdSalesFunnel(state: any, payload: any) {
        state.idSalesFunnel = payload;
      },
      setStagesFunnel(state: any, payload: any) {
        payload.sort((stage: any, nextStage: any) => {
          return stage.position > nextStage.position ? 1 : -1;
        });
        state.stagesFunnel = payload;
      },
      setNameSaleFunnel(state: any, payload: any) {
        state.nameSaleFunnel = payload;
      },
      setListEditStageFunnel(state: any, payload: any) {
        payload.sort((stage: any, nextStage: any) => {
          return stage.position > nextStage.position ? 1 : -1;
        });
        state.listEditStageFunnel = payload;
      },
      setNotesList(state: any, payload: any) {
        state.notesList = payload;
      }
    }
  };
}

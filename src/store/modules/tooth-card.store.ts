import { State } from "@/types/tooth-card";

export default function(api: any) {
  return {
    namespaced: true,
    state: {
      toothCardList: {
        deciduous: [],
        permanent: []
      },
      idPatient: 0,
      idForm: 0,
      selectedTooth: 0,
      activeTabTeethCard: "permanent"
    },
    getters: {
      toothCardList(state: State) {
        return state.toothCardList;
      },
      selectedTooth(state: State) {
        return state.selectedTooth;
      },
      activeTabTeethCard(state: State) {
        return state.activeTabTeethCard;
      },
      idPatient(state: State) {
        return state.idPatient;
      },
      idForm(state: State) {
        return state.idForm;
      }
    },
    actions: {
      getTeethCard(state: any, id: number): void {
        api.teethCard.getListByPatientId(id).then((response: any) => {
          if (response.data.teeth_card === null) {
            state.commit("setToothCardList", {
              deciduous: {},
              permanent: {}
            });
          } else {
            state.commit("setToothCardList", response.data.teeth_card);
            state.commit("setIdForm", response.data.id);
          }
        });
      },
      saveToothCard({ state }: any): void {
        api.teethCard
          .getListByPatientId(state.idPatient)
          .then((response: any) => {
            if (response.data.errorMessage === "EMPTY_RESULT") {
              api.teethCard.create(state.idPatient, state.toothCardList);
              // TODO: replace to notifications
              alert("Зубная карта добавлена в базу");
            }
            if (response.data.errorMessage === "SUCCESS") {
              api.teethCard.update(state.idForm, state.toothCardList);
              alert("Зубная карта обновлена");
            }
          });
      }
    },
    mutations: {
      setToothCardList(state: State, toothCardList: any) {
        state.toothCardList = toothCardList;
      },
      setIdPatient(state: State, idPatient: any) {
        state.idPatient = idPatient;
      },
      setSelectedTooth(state: State, selectedTooth: any) {
        state.selectedTooth = selectedTooth;
      },
      setActiveTabTeethCard(state: State, activeTabTeethCard: any) {
        state.activeTabTeethCard = activeTabTeethCard;
      },
      setIdForm(state: State, idForm: any) {
        state.idForm = idForm;
      }
    }
  };
}

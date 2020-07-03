import { Patient } from "@/shared/classes/patient.model";
export default function(api: any) {
  return {
    namespaced: true,
    state: {
      patients: []
    },
    getters: {
      // TODO: unify
      patients_simple: (state: any) => {
        return state.patients;
      },
      PATIENTS(state: any) {
        return state.patients;
      }
    },
    actions: {
      getPatientsList: async (context: any) => {
        const resPatients: any = await api.patients.getList();
        context.commit("setPatients", resPatients.data.patients);
      },
      CREATE_PATIENT: async (context: any, values: Patient) => {
        return await api.patients.createPatient(values);
      }
    },
    mutations: {
      setPatients(state: any, patients: any[]) {
        state.patients = patients;
      }
    }
  };
}

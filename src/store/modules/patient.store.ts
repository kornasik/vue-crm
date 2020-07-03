import {Patient} from "@/shared/classes/patient.model";
export default function(api: any) {
  return {
    namespaced: true,
    actions: {
      CREATE_PATIENT: async (context: any, values: Patient) => {
        return await api.patients.createPatient(values);
      }
    },
    getters: {
      PATIENTS(state: any) {
        return state.patients;
      }
    }
  };
}

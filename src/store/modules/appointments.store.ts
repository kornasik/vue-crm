import Appointment from "@/shared/classes/appointment.model";
export default function(api: any) {
  return {
    namespaced: true,
    state: {
      appointments: null
    },
    getters: {
      list: function(state: any) {
        return state.appointments;
      }
    },
    actions: {
      getAppointmentsByPatientId: async (context: any, patientId: number) => {
        const res = await api.appointments.getListByPatientId(patientId);
        res.data.appointments = res.data.appointments.map(
          (appointment: Appointment) => {
            if (!appointment.manipulations_ids) {
              appointment.manipulations_ids = [];
            }
            let ids: any = [];
            appointment.records.forEach((record: any) => {
              if (record.manipulation_ids && record.manipulation_ids.length) {
                ids = [...new Set(record.manipulation_ids)];
              }
            });
            appointment.manipulations_ids = [
              ...new Set([...ids, ...appointment.manipulations_ids])
            ];
            return appointment;
          }
        );
        context.commit("setList", res.data.appointments);
      },
      createAppointment: async (context: any) => {
        const res = await api.appointments.create({
          patient_id: 11,
          doctor_id: 1,
          date: "2019-10-31",
          start: "18:18:02",
          end: "18:18:03"
        });
      }
    },
    mutations: {
      setList: (state: any, list: Appointment[]) => {
        state.appointments = list;
      },
      add: (state: any, payload: any) => {
        state.appointments = payload;
      }
    }
  };
}

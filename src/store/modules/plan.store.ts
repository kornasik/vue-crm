import Plan from "@/shared/classes/plan.model";

export default function(api: any) {
  return {
    namespaced: true,
    state: {
      plans: []
    },
    getters: {
      plans: function(state: any) {
        return state.plans;
      }
    },
    actions: {
      getPlansByPatientId: async (context: any, patientId: number) => {
        const plans: Plan[] = [new Plan("Внеплановые приёмы")];
        const res = await api.plan.getListByPatientId(patientId);
        plans.push(...res.data.plans);
        context.commit("SET_PLANS", plans);
      },
      CREATE_PLAN: async (context: any, payload: any) => {
        return await api.plan.create(payload);
      }
    },
    mutations: {
      SET_PLANS: (state: any, plans: Plan[]) => {
        state.plans = plans;
      }
    }
  };
}

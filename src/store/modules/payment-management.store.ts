import { State, paymentItem } from "@/types/payment-management";

export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      paymentList: []
    },
    getters: {
      getPaymentList(state: State) {
        return state.paymentList;
      }
    },
    mutations: {
      setPaymentList(state: any, paymentList: paymentItem) {
        state.paymentList = paymentList;
      }
    }
  };
}

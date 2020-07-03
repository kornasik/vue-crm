export interface State {
  paymentList: paymentItem[];
}

export interface paymentItem {
  id: number;
  appointment: string;
  currency: string;
  status: boolean;
  client: string;
  payer: string;
  amount: string;
}

import Manipulation from "./manipulation";

export default class Plan {
  account_id: number;
  content: any[];
  coupon?: string;
  created?: string;
  currency: string;
  currency_id: number;
  deleted?: string;
  final_cost: number;
  id: number;
  manipulations: Manipulation[];
  name: string;
  operation_id: number;
  patient: Object;
  patient_id?: number;
  total_max: number;
  total_min: number;
  updated?: string;
  user_id: number;

  constructor(name: string) {
    this.account_id = 0;
    this.content = [];
    this.coupon = "";
    this.created = "";
    this.currency = "";
    this.currency_id = 0;
    this.deleted = "";
    this.final_cost = 0;
    this.id = 0;
    this.manipulations = [];
    this.name = name;
    this.operation_id = 0;
    this.patient = {};
    this.patient_id = 0;
    this.total_max = 0;
    this.total_min = 0;
    this.updated = "";
    this.user_id = 0;
  }
}

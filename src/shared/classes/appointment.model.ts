import { STATUS_TYPES } from "../enums/appointmentsStatusTypes";
import { PAYMENT_STATES } from "../enums/appointmentsPaymentStates";
import AppointmentRecord from "./AppointmentRecord.class";

export default interface Appointment {
  id: number;
  name: string;
  patient_id: number;
  plan_id?: number;
  total_min: number;
  total_max: number;
  currency: string;
  payment_state: PAYMENT_STATES;
  completion_status: STATUS_TYPES;
  records: AppointmentRecord[];

  manipulations_ids: number[];
}

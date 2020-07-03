import { Reagent } from "./reagent";
import Appointment from "./appointment.model";
import ManipulationsFilter from "./manipulations-filter.class";

export default class Manipulation {
  id: number;
  category_id: number;
  group_id: number;
  max_price: number;
  min_price: number;
  position: number;
  name: string;
  number: string;
  currency: string;
  appointment?: Appointment;
  reagents: Reagent[];
  referral: string;

  constructor(appointment: Appointment) {
    this.id = 0;
    this.category_id = 0;
    this.group_id = 0;
    this.max_price = 0;
    this.min_price = 0;
    this.position = 0;
    this.name = "";
    this.number = "";
    this.currency = "";
    this.reagents = [];
    this.referral = "";
    this.appointment = appointment;
  }
  setDefaultReagentsQuantity() {
    this.reagents.forEach((reagent: Reagent) => {
      reagent.quantity = 1;
    });
  }

  static getMergedManipulations(
    manipulations: Manipulation[],
    appointments: Appointment[]
  ): Manipulation[] {
    manipulations.forEach((manipulation: Manipulation) => {
      appointments.forEach((appointment: Appointment) => {
        // TODO: get manipulation ids from records to appointment
        if (appointment.manipulations_ids) {
          const isManipulationHasAppointment = appointment.manipulations_ids.find(
            (id: number) => id === manipulation.id
          );
          if (isManipulationHasAppointment) {
            manipulation.appointment = appointment;
          }
        }
      });
    });
    return manipulations;
  }
  static createManipulationsForAppointments(
    appointments: Appointment[]
  ): Manipulation[] {
    return appointments.map(
      (appointment: Appointment) => new Manipulation(appointment)
    );
  }

  static getFilteredManipulations(
    manipulations: Manipulation[],
    filter: ManipulationsFilter
  ) {
    // const filtered: Manipulation[] = [];
    const filtered: Manipulation[] = manipulations.filter((m: Manipulation) => {
      if (m.appointment) {
        // if (!filter.isReferralSelected(m.referral)) {
        //   return false;
        // }
        // if (!filter.isStatusSelected(m.appointment.payment_state)) {
        //   return false;
        // }
        // for (let i = 0; i < m.appointment.records.length; i++) {
        //   if (!filter.isDoctorSelected(m.appointment.records[i].doctor.name)) {
        //     return false;
        //   }
        //   if (!filter.isDateSelected(m.appointment.records[i].date)) {
        //     return false;
        //   }
        // }
        return true;
      }
      return true;
    });
    return filtered;
  }
}

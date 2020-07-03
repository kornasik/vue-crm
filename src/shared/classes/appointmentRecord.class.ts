import Duration from "./duration.model";
import Doctor from "./doctor.model";

export default interface AppointmentRecord {
  id: number;
  doctor: Doctor;
  chair_id: number;
  appointment_id: number;
  manipulation_ids: number[];
  teeth_list: number[];
  date: string;
  start: string;
  end: string;
  duration: Duration; //суммировать
}

export interface PlanDataItem {
  namePatient: string;
  nameProcedure: string;
}

export interface InterfaceDoctor {
  id: number;
  name: string;
}

interface InterfaceUserInListDoctors {
  first_name: string;
  last_name: string;
}

export interface SelectDataTable {
  time: string;
  doctor: string;
  day: object;
}

export interface State {
  selectedDoctor: object;
  selectedDates: string[];
  listDoctors: string[];
  currentDataTable: SelectDataTable;
}

export interface ISelectTypeReception {
  nameDoctor: string;
  typeReception: string;
}

export interface TypeReception {
  startReception: string;
  endReception: string;
}

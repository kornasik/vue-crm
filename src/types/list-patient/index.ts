export interface Field {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  required?: boolean;
}

export interface FieldForPatient {
  label: string;
  value: string;
}

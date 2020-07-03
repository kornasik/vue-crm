export class Documents {
  id: number;
  name: string;
  files: [];
  patient_id: number;
  note: string;

  constructor(id: number, name: string, files: [], patient_id: number, note: string) {
    this.id = id;
    this.name = name;
    this.files = files;
    this.patient_id = patient_id;
    this.note = note;
  }
}

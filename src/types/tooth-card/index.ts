export interface ToothStatus {
  id: number;
  name: string;
  created: string | null;
  updated: string | null;
  deleted: string | null;
}

export interface TeethCard {
  deciduous: Tooth;
  permanent: Tooth;
}

interface Tooth {
  [key: number]: number[];
}

export interface State {
  toothCardList: object;
  idPatient: number;
  idForm: number;
  selectedTooth: number;
  activeTabTeethCard: string;
}

export interface DropFiles {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: string;
}

export interface Image {
  id: number;
  type: string;
  number: number;
  image: string;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  deleted_at: string | null;
  deleted_by: string | null;
}

export interface uploadImage {
  displayFileName: string | null;
  uploadFileData: string | null;
  file: object | null;
}

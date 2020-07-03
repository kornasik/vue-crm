export class getDocuments {
  documents: [];
  documentId: number;

  constructor(documents: [], documentId: number) {
    this.documents = documents;
    this.documentId = documentId;
  }
}

export class downloadEvent {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class deleteEvent {
  id: number;
  hard: boolean;

  constructor(id: number, hard: boolean) {
    this.id = id;
    this.hard = hard;
  }
}

export class setRefs {
  documentRef: number;
  filesRefs: [];

  constructor(documentRef: number, filesRefs: []) {
    this.documentRef = documentRef;
    this.filesRefs = filesRefs;
  }
}

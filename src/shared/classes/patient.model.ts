export class Patient {
  id: number;
  family_id: number;
  content: [];

  constructor(id: number, family_id: number, content: []) {
    this.id = id;
    this.family_id = family_id;
    this.content = content;
  }
}

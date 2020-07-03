export default class Template {
  id?: string;
  name: string;
  content: string;
  category_id?: number;
  user_id?: number;
  icd_list: any[];

  constructor() {
    this.name = "";
    this.content = "";
    this.icd_list = [];
  }
}

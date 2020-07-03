export default class Template {
  id: number;
  name: string;
  user_id: number;
  category_id: number;
  position: number;
  content: string;

  constructor(
    id: number,
    name: string,
    user_id: number,
    category_id: number,
    position: number,
    content: string
  ) {
    this.id = id;
    this.name = name;
    this.user_id = user_id;
    this.category_id = category_id;
    this.position = position;
    this.content = content;
  }
}

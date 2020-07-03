import MultiselectValue from "./multiselect-value.model";

export default class Multiselect {
  list: MultiselectValue[] = [];
  selected: MultiselectValue[] = [];

  constructor() {
    this.list = [];
    this.selected = [];
  }
}

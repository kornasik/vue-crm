import Template from "./Template.class";

export default class TreeItem {
  id: string;
  name: string;
  position: string;
  created: string;
  updated: string | null;
  deleted: string | null;
  treeId: string;
  ancestor_id: string | null;
  parent_id: string | null;
  level: string;
  templates: Array<Template>;
  childs: Array<TreeItem>;

  constructor(
    id: string,
    name: string,
    position: string,
    created: string,
    updated: string | null,
    deleted: string | null,
    treeId: string,
    ancestor_id: string | null,
    parent_id: string | null,
    level: string,
    templates: Array<Template>,
    childs: Array<TreeItem> | []
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.created = created;
    this.updated = updated;
    this.deleted = deleted;
    this.treeId = treeId;
    this.ancestor_id = ancestor_id;
    this.parent_id = parent_id;
    this.level = level;
    this.templates = templates;
    this.childs = childs;
  }
}

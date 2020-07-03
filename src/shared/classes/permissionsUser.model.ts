import { PermissionsModule } from "./permissionsModule.model";

export class PermissionsUser {
  id: number;
  name: string;
  modules: PermissionsModule[];
  groupId: number | null;

  constructor(
    id: number,
    name: string,
    modules: PermissionsModule[],
    groupId: number
  ) {
    this.id = id;
    this.name = name;
    this.modules = modules;
    this.groupId = groupId;
  }

  setId(id: number) {
    this.id = id;
  }
}

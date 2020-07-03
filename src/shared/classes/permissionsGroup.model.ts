import { PermissionsModule } from "./permissionsModule.model";

export class PermissionsGroup {
  id: number;
  name: string;
  modules: PermissionsModule[];

  constructor(id: number, name: string, modules: PermissionsModule[]) {
    this.id = id;
    this.name = name;
    this.modules = modules;
  }

  setId(id: number) {
    this.id = id;
  }

  
}

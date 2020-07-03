import { PermissionsFunction } from "./permissionsFunction.model";

export interface PermissionsModule {
  id: number;
  name: string;
  functions: PermissionsFunction[];
}

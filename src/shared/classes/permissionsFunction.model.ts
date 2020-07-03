import { FUNCTION_TYPES } from "../constants/permissions";

export interface PermissionsFunction {
  id: number;
  name: string;
  type: FUNCTION_TYPES;
  actions: {
    add: number;
    edit: number;
    delete: number;
    view: number;
  };
}

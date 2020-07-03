import { PermissionsUser } from "../permissionsUser.model";
import { PermissionsModule } from "../permissionsModule.model";

export interface PermissionsUserState {
  permissionsUsers: PermissionsUser[];
  permissionsModules: PermissionsModule[];
  openedUser: PermissionsUser | null;
}

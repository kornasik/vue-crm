import httpClient from "./httpClient/httpClient";
import { PermissionsUser } from "@/shared/classes/permissionsUser.model";

const END_POINT = "/permissions/users";

const getPermissionsUsersList = (): Promise<PermissionsUser[]> =>
  httpClient.get(`${END_POINT}/list`);
const getPermissionsUserById = (id: number): Promise<PermissionsUser> =>
  httpClient.get(`${END_POINT}/${id}`);
const deletePermissionsUserById = (id: number) =>
  httpClient.delete(`${END_POINT}/${id}`);
const addPermissionsUser = (
  newGroup: PermissionsUser
): Promise<PermissionsUser> => httpClient.post(`${END_POINT}`, newGroup);
const updatePermissionsUser = (newGroup: PermissionsUser) =>
  httpClient.put(`${END_POINT}`, newGroup);

export {
  getPermissionsUsersList,
  addPermissionsUser,
  deletePermissionsUserById,
  getPermissionsUserById,
  updatePermissionsUser
};

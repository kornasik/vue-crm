import httpClient from "./httpClient/httpClient";
import { PermissionsGroup } from "@/shared/classes/permissionsGroup.model";

const END_POINT = "/permissions/groups";

const getPermissionsGroupsList = () => httpClient.get(`${END_POINT}/list`);
const getPermissionsGroupById = (id: number) =>
  httpClient.get(`${END_POINT}/${id}`);
const deletePermissionsGroupById = (id: number) =>
  httpClient.delete(`${END_POINT}/${id}`);
const addPermissionsGroup = (
  newGroup: PermissionsGroup
): Promise<PermissionsGroup> => httpClient.post(`${END_POINT}`, newGroup);
const updatePermissionsGroup = (newGroup: PermissionsGroup) =>
  httpClient.put(`${END_POINT}`, newGroup);
export {
  getPermissionsGroupsList,
  addPermissionsGroup,
  deletePermissionsGroupById,
  getPermissionsGroupById,
  updatePermissionsGroup
};

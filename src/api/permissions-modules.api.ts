import httpClient from "./httpClient/httpClient";

const END_POINT = "/permissions/modules";

const getPermissionsModulesList = () => httpClient.get(`${END_POINT}/list`);
export { getPermissionsModulesList };

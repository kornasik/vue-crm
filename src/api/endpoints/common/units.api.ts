// const END_POINT = '/common/units';

// const getUnitsList = () => httpClient.get(`${END_POINT}/list`);
// const getUnitsListByGroupId = (groupId: number) => {
//   return httpClient.get(`${END_POINT}/list?group_id=${groupId}`);
// };
// const getUnitsGroupList = () => httpClient.get(`/common/units-group/list`);
// const getCountriesList = () => httpClient.get(`/common/countries/list`);
// const setCountryPack = (id: number) => {
//   return httpClient.get(`${END_POINT}/set-country-pack?refId=${id}`);
// };
// const updateEnableAbility = (id: number, value: number) => {
//   return httpClient.put(`${END_POINT}/${id}`, { 'enabled': value });
// };

// export {
//   getUnitsList,
//   getUnitsListByGroupId,
//   getUnitsGroupList,
//   getCountriesList,
//   updateEnableAbility,
//   setCountryPack
// }

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  getListByGroupId(groupId: number) {
    return httpClient.get(`${endpoint}/list?group_id=${groupId}`);
  },
  updateEnableAbility(id: number, value: number) {
    return httpClient.put(`${endpoint}/${id}`, { enabled: value });
  }
});

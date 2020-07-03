// import httpClient from '../httpClient/httpClient';

// const END_POINT = '/common/currencies';

// const getCurrencyList = () => {
//   return httpClient.get(`${END_POINT}/list`);
// };
// const getCurrencyListByEnabledId = (enabledId: number) => {
//   return httpClient.get(`${END_POINT}/list?enabled${enabledId}`);
// };
// const update = (id: number, value: number) => {
//   return httpClient.put(`${END_POINT}/${id}`, { 'enabled': value })
// };
// export {
//   getCurrencyList,
//   getCurrencyListByEnabledId,
//   update
// }

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  getListByEnabledId(enabledId: number) {
    return httpClient.get(`${endpoint}/list?enabled${enabledId}`);
  },
  updateById(id: number, value: number) {
    return httpClient.put(`${endpoint}/${id}`, { enabled: value });
  }
});

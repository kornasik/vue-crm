// import httpClient from '../../httpClient/httpClient';

// const END_POINT = '/medicine/complaint-categories';

// const getCategoriesList = () => httpClient.get(`${END_POINT}/list`);

// export {
//   getCategoriesList
// }

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  create(category: any) {
    return httpClient.post(`${endpoint}/create`, category);
  },
  update(category: any) {
    return httpClient.put(`${endpoint}`, category);
  },
  delete(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  changePosition(positions: any) {
    return httpClient.post(`${endpoint}/change-position`, positions);
  },
});

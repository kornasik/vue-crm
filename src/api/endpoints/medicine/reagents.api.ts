// import httpClient from "../httpClient/httpClient";
import { Reagent } from "@/shared/classes/reagent";

// const END_POINT = "/medicine/reagents";

// const getReagentsList = () => httpClient.get(`${END_POINT}/list`);
// const getReagentsListByManufacturerId = (manufacturerId: number) =>
//   httpClient.get(`${END_POINT}/list?manufacturer_id=${manufacturerId}`);
// const deleteReagentById = (id: number) =>
//   httpClient.delete(`${END_POINT}/${id}`);
// const createReagent = (values: Reagent) =>
//   httpClient.post(`${END_POINT}`, values);
// const updateReagent = (values: Reagent) =>
//   httpClient.put(`${END_POINT}`, values);
// export {
//   getReagentsList,
//   getReagentsListByManufacturerId,
//   createReagent,
//   updateReagent,
//   deleteReagentById
// };

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  getListByManufacturerId(manufacturerId: number) {
    return httpClient.get(
      `${endpoint}/list?manufacturer_id=${manufacturerId}`
    );
  },
  deleteById(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  create(values: Reagent) {
    return httpClient.post(`${endpoint}`, values);
  },
  update(values: Reagent) {
    return httpClient.put(`${endpoint}`, values);
  }
});

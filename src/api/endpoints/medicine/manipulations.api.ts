// import httpClient from "../httpClient/httpClient";
import Manipulation from "@/shared/classes/manipulation";

// const END_POINT = "/medicine/manipulations";

// const getManipulationsList = () => httpClient.get(`${END_POINT}/list`);
// const getManipulationsListByRefId = (refId: number) =>
//   httpClient.get(`${END_POINT}/list?refId=${refId}`);
// const changeManipulationsById = (updatedManipulation: any) =>
//   httpClient.put(END_POINT, updatedManipulation);
// const createManipulation = (newManipulation: Manipulation) =>
//   httpClient.post(`${END_POINT}/create`, newManipulation);
// const changeManipulationPositions = (positions: any) =>
//   httpClient.post(`${END_POINT}/change-position`, positions);
// const deleteManipulationById = (id: number) =>
//   httpClient.delete(`${END_POINT}/${id}`);

// export {
//   getManipulationsList,
//   getManipulationsListByRefId,
//   changeManipulationsById,
//   createManipulation,
//   changeManipulationPositions,
//   deleteManipulationById
// };

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  getListByRefId(refId: number) {
    return httpClient.get(`${endpoint}/list?refId=${refId}`);
  },
  changeById(updatedManipulation: any) {
    return httpClient.put(`${endpoint}`, updatedManipulation);
  },
  create(newManipulation: Manipulation) {
    return httpClient.post(`${endpoint}`, newManipulation);
  },
  changePositions(positions: any) {
    return httpClient.post(`${endpoint}/change-position`, positions);
  },
  deleteById(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  }
});

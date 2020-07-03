// import httpClient from "../httpClient/httpClient";

// const END_POINT = "/medicine/manipulations-category";

// const getManipulationsCategoriesList = () =>
//   httpClient.get(`${END_POINT}/list`);
// const deleteManipulationsCategoryById = (id: number, isMerge: boolean) =>
//   httpClient.delete(`${END_POINT}/${id}?merge=${isMerge}`);
// const createManipulationsCategory = (newCategory: NewManipuplationsCategory) =>
//   httpClient.post(`${END_POINT}/create`, newCategory);
// const changePositionManipulationsCategory = (positions: any) =>
//   httpClient.post(`${END_POINT}/change-position`, positions);
// const changeManipulationsCategoryById = (
//   id: number,
//   updatedManipulation: string
// ) => httpClient.put(`${END_POINT}/${id}`, updatedManipulation);

// export {
//   getManipulationsCategoriesList,
//   deleteManipulationsCategoryById,
//   createManipulationsCategory,
//   changePositionManipulationsCategory,
//   changeManipulationsCategoryById
// };

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  deleteById(id: number, isMerge: boolean) {
    return httpClient.delete(`${endpoint}/${id}?merge=${isMerge}`);
  },
  create(newCategory: any) {
    return httpClient.post(`${endpoint}/create`, newCategory);
  },
  changePosition(positions: any) {
    return httpClient.post(`${endpoint}/change-position`, positions);
  },
  changeById(id: number, updatedManipulation: string) {
    return httpClient.put(`${endpoint}/${id}`, updatedManipulation);
  }
});

// interface ManipuplationsCategoryPosition {
//   id: number;
//   position: number;
// }
// interface NewManipuplationsCategory {
//   parent_id: number;
//   name: string;
// }

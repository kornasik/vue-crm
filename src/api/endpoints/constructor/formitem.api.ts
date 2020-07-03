// import httpClient from "../httpClient/httpClient";

// const END_POINT = "/constructor/formitem";

// const changeFormItem = (id: number, itemChangeRequest: any) =>
//   httpClient.put(`${END_POINT}/${id}`, itemChangeRequest);

// const addFormItem = (itemAddRequest: any) =>
//   httpClient.post(`${END_POINT}`, itemAddRequest);

// const deleteFormItemById = (id: number) =>
//   httpClient.delete(`${END_POINT}/${id}`);

// export { changeFormItem, addFormItem, deleteFormItemById };

export default (httpClient: any, endpoint: string) => ({
  change(id: number, itemChangeRequest: any) {
    return httpClient.put(`${endpoint}/${id}`, itemChangeRequest);
  },
  add(itemAddRequest: any) {
    return httpClient.post(`${endpoint}`, itemAddRequest);
  },
  deleteById(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  }
});

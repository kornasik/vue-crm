export default (httpClient: any, endpoint: string) => ({
  getById(id: number) {
    return httpClient.get(`${endpoint}/get-form?form_id=${id}`);
  },
  getByTypeId(id: number) {
    return httpClient.get(`${endpoint}/get-form?form_type_id=${id}`);
  },
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  create(formRequest: any) {
    return httpClient.post(`${endpoint}/create`, formRequest);
  },
  updateById(updateFormRequest: any) {
    return httpClient.put(`${endpoint}`, updateFormRequest);
  },
  deleteById(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  }
});

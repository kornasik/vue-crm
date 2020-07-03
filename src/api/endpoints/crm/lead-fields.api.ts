export default (httpClient: any, endpoint: string) => ({
  // TODO: create classes
  add(dataField: object) {
    return httpClient.post(`${endpoint}`, dataField);
  },
  delete(idField: number) {
    return httpClient.delete(`${endpoint}/${idField}`);
  },
  list() {
    return httpClient.post(`${endpoint}/list`);
  },
  // TODO: create classes
  update(updateDataField: any) {
    return httpClient.put(`${endpoint}/${updateDataField.id}`, updateDataField);
  }
});

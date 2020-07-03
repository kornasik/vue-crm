export default (httpClient: any, endpoint: string) => ({
  addList(nameSaleFunnel: object) {
    return httpClient.post(`${endpoint}/create`, nameSaleFunnel);
  },
  delete(id: any) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  list() {
    return httpClient.post(`${endpoint}/list`);
  },
  update(updateSaleFunnelData: any) {
    return httpClient.put(`${endpoint}/${updateSaleFunnelData.id}`, {
      name: updateSaleFunnelData.name,
      enable: 1
    });
  }
});

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
    // httpClient.get(`/common/countries/list`);
  },
  setPack(id: number) {
    return httpClient.get(`${endpoint}/set-country-pack?refId=${id}`);
  }
});

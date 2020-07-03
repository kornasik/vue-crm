export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  getLimitedList(from: number, to: number) {
    return httpClient.get(`${endpoint}/list?from=${from}&limit=${to}`);
  }
});

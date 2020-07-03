export default (httpClient: any, endpoint: string) => ({
  list() {
      // TODO: check 1
    return httpClient.post(`${endpoint}/list?stage_id=1`);
  }
});

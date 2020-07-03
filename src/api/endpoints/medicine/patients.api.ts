// import httpClient from "../httpClient/httpClient";

// const END_POINT = "/medicine/patient";

// const getList = () => httpClient.get(`${END_POINT}/list`);
// const getPatientById = (id: number) =>
//   httpClient.get(`${END_POINT}/${id}`);

// export { getList, getPatientById };

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  getById(id: number) {
    return httpClient.get(`${endpoint}/list?id=${id}`);
  },
  createPatient(values: number) {
    return httpClient.post(`${endpoint}`, values);
  }
});

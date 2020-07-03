// import httpClient from "../httpClient/httpClient";

// const END_POINT = "/medicine/appointments";

// const getList = () => httpClient.get(`${END_POINT}/list`);

// export { getList };

export default (httpClient: any, endpoint: string) => ({
  getListByPatientId(id: number) {
    return httpClient.get(`${endpoint}/list?patient_id=${id}`);
  },
  create(reqAdd: any) {
    return httpClient.post(`${endpoint}/create`, reqAdd);
  }
});

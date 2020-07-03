// import httpClient from "../httpClient/httpClient";

// const END_POINT = "/medicine/plan";

export default (httpClient: any, endpoint: string) => ({
  create(newPlan: any) {
    return httpClient.post(`${endpoint}/create`, newPlan);
  },
  getListByPatientId(id: number) {
    return httpClient.get(`${endpoint}/list?patient_id=${id}`);
  }
});

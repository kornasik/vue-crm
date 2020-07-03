// import { interfaceTeethCard } from "@/types/tooth-card";

export default (httpClient: any, endpoint: string) => ({
  create(idPatient: number, teethCard: any) {
    return httpClient.post(`${endpoint}/create`, {
      patient_id: Number(idPatient),
      teeth_card: [teethCard]
    });
  },
  getListByPatientId(id: number) {
    return httpClient.get(`${endpoint}/list?patient_id=${id}`);
  },
  update(idForm: number, teethCard: any) {
    return httpClient.put(`${endpoint}/teeth-card`, {
      id: Number(idForm),
      teeth_card: [teethCard]
    });
  }
});

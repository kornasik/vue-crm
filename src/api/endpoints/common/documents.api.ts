// import httpClient from "../httpClient/httpClient";
import { Documents } from '@/shared/classes/documents';
import { deleteEvent } from '@/shared/classes/getDocuments';

// const END_POINT = "/common/documents";

// const getDocumentsList = (patient_id: number) => httpClient.get(`${END_POINT}/list?patient_id=${patient_id}`);
// const createDocument = (document: Documents) => httpClient.post(`${END_POINT}`, document);
// const deleteDocument = (data: deleteEvent) => httpClient.post(`${END_POINT}/delete`, data);

// export {
//   getDocumentsList,
//   createDocument,
//   deleteDocument
// };

export default (httpClient: any, endpoint: string) => ({
  getListByPatientId(patientId: number) {
    return httpClient.get(`${endpoint}/list?patient_id=${patientId}`);
  },
  create(document: Documents) {
   return httpClient.post(`${endpoint}`, document);
  },
  delete(data: deleteEvent) {
    return httpClient.post(`${endpoint}/delete`, data)
  }
});
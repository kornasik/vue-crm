import {
  getDocuments,
  downloadEvent,
  deleteEvent
} from "@/shared/classes/getDocuments";

export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      documents: null,
      documentId: null
    },
    actions: {
      GET_DOCUMENTS: async (context: any, patient_id: number) => {
        context.commit(
          "SET_DOCUMENTS",
          (await api.documents.getListByPatientId(patient_id)).data.documents
        );
      },
      DOWNLOAD: async (context: any, event: downloadEvent) => {
        await api.files.download(event.id).then((response: any) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", event.name);
          document.body.appendChild(fileLink);
          fileLink.click();
        });
      },
      DELETE_DOC: async (context: any, event: deleteEvent) => {
        return await api.documents.delete(event);
      }
    },
    getters: {
      DOCUMENTS: function(state: getDocuments) {
        return state.documents;
      },
      DOC_ID: function(state: getDocuments) {
        return state.documentId;
      }
    },
    mutations: {
      SET_DOCUMENTS: (state: any, payload: []) => {
        state.documents = payload;
      },
      SET_DOC_ID: async (state: any, payload: number) => {
        state.documentId = payload;
      }
    }
  };
}

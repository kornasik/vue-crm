import { Documents } from "@/shared/classes/documents";
import { setRefs } from "@/shared/classes/getDocuments";

export default function(api: any) {
  return {
    // namespaced: true,
    state: {
      filesRefs: null,
      documentRef: null
    },
    actions: {
      UPLOAD_FILES: async (context: any, files: []) => {
        context.commit("SET__FILES_REFS", (await api.files.upload(files)).data.refId);
      },
      CREATE_DOCUMENT: async (context: any, values: Documents) => {
        context.commit("SET_REF", (await api.documents.create(values)).data.refId);
      }
    },
    getters: {
      FILES_REFS: function(state: any) {
        return state.filesRefs;
      },
      REF: function(state: any) {
        return state.documentRef;
      }
    },
    mutations: {
      SET__FILES_REFS: async (state: setRefs, payload: []) => {
        state.filesRefs = payload;
      },
      SET_REF: async (state: setRefs, payload: number) => {
        state.documentRef = payload;
      }
    }
  };
}

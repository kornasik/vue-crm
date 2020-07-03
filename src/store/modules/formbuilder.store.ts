export default function(api: any) {
  return {
    namespaced: true,
    state: {
      form: null,
      forms: [],
      formItems: []
    },
    getters: {
      FORM: (state: any) => {
        return state.form;
      },
      FORMS: (state: any) => {
        return state.forms;
      },
      BLOCKS: (state: any) => {
        return state.blocks;
      },
      formItems: (state: any) => {
        return state.formItems.map((formItem: any) => {
          return { content: formItem };
        });
      }
    },
    actions: {
      createForm: async (context: any, addRequest: any) => {
        const addedForm: any = await api.form.create(addRequest);
        return new Promise((resolve, reject) => {
          context.commit("ADD_NEW_FORM", addedForm.form);
          resolve(addedForm);
        });
      },
      createFormItem: async (context: any, addFormItemRequest: any) => {
        const idAddedItem: any = await api.formitem.add(addFormItemRequest);
        return new Promise((resolve, reject) => {
          resolve(idAddedItem);
        });
      },
      getFormList: async (context: any) => {
        const forms = ((await api.form.getList()) as any).data.forms;
        context.commit("SET_FORMS", forms);
      },
      getFormById: async (context: any, id: number) => {
        const res: any = await api.form.getById(id);
        return new Promise((resolve, reject) => {
          resolve(res.data.form);
        });
      },
      GET_DEFAULT_PATIENT_FORM: async (context: any, id: number) => {
        const patientFormResponse = await api.form.getByTypeId(id);
        context.commit("SET_FORM", patientFormResponse.data.form);
      },
      geFormItemsList: async (context: any) => {
        const elementsResponse = await api.block.getList();
        context.commit("SET_FORM_ITEMS", elementsResponse.data.blocks);
      },
      updateFormItemById: async (context: any, formItem: any) => {
        const form: any = await api.formitem.change(formItem.id, formItem);
        return new Promise((resolve, reject) => {
          resolve(form);
        });
      },
      deleteFormById: async (context: any, id: number) => {
        await api.form.deleteById(id);
        context.commit("DELETE_FORM", id);
      },
      deleteFormItemById: async (context: any, formItemId: number) => {
        const res: any = await api.formitem.deleteById(formItemId);
        return new Promise((resolve, reject) => {
          resolve(res);
        });
      },
      updateFormById: async (context: any, updateFormReq: any) => {
        const res: any = await api.form.updateById(updateFormReq);
      }
    },
    mutations: {
      SET_FORM(state: any, form: any) {
        state.form = form;
      },
      SET_FORMS(state: any, forms: any) {
        state.forms = forms;
      },
      SET_BLOCKS(state: any, blocks: any) {
        state.blocks = blocks;
      },
      ADD_NEW_FORM(state: any, newForm: any) {
        state.forms.push(newForm);
      },
      SET_FORM_ITEMS(state: any, formItems: any) {
        state.formItems = formItems;
      },
      DELETE_FORM(state: any, id: number) {
        state.forms = state.forms.filter((form: any) => form.id !== id);
      }
    }
  };
}

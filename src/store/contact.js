export default {
  state: {
    fieldValue: {
      contact_id: 1,
      params: [
        {
          field_id: 1,
          value: "Коля"
        },
        {
          field_id: 2,
          value: "Николаев"
        },
        {
          field_id: 3,
          value: "+375331111111"
        },
        {
          field_id: 4,
          value: ["Да", "Нет"]
        },
        {
          field_id: 5,
          value: ["item1", "item2", "item3"]
        },
        // Todo: сделать value объектом с ключами id value
        {
          field_id: 6,
          value: ["item1", "item2", "item3", "item4"]
        },
        {
          field_id: 7,
          value: "2019-12-12"
        }
      ]
    },
    fieldLabel: [
      {
        id: 1,
        label: "Имя",
        type: "text",
        is_required: 1
      },
      {
        id: 2,
        label: "Фамилия",
        type: "text",
        is_required: 0
      },
      {
        id: 3,
        label: "Раб.тел",
        type: "number",
        is_required: 0
      },
      {
        id: 4,
        label: "Что-то с флагом",
        type: "flag",
        is_required: 0
      },
      {
        id: 5,
        label: "Список",
        type: "list",
        is_required: 0
      },
      {
        id: 6,
        label: "Мультисписок",
        type: "multiselect",
        is_required: 0
      },
      {
        id: 7,
        label: "Дата",
        type: "date",
        is_required: 0
      }
    ],
    tagContact: [
      "Остеопатия",
      "Гнатология",
      "Канны веб 2017",
      "Прага_Не_предлагать",
      "Cong404",
      "Замени меня"
    ],
    modalType: "",
    modalAddValue: false,
    dataContact: []
  },
  mutations: {
    setFieldValue(state, payload) {
      state.fieldValue.params.push({
        field_id: state.fieldValue.params.length + 1,
        value: payload
      });
    },
    setFieldLabel(state, payload) {
      state.fieldLabel.push({
        id: state.fieldLabel.length + 1,
        label: payload.label,
        type: payload.type,
        is_required: payload.required
      });
    },
    setModalType(state, payload) {
      state.modalType = payload;
    },
    setModalAddValue(state, payload) {
      state.modalAddValue = payload;
    },
    setDataContact(state, payload) {
      state.dataContact = payload;
    },
    editDataContact(state, payload) {
      state.dataContact[payload.id] = payload;
    }
  }
};

const permissionsGroupsresponse: any = {
  groups: [],
  refId: null,
  errorCode: 0,
  errorMessage: "SUCCESS"
};

const permissionsUsersResponse: any = {
  users: [],
  refId: null,
  errorCode: 0,
  errorMessage: "SUCCESS"
};

const permissionsModulesResponse: any = {
  modules: [
    {
      id: 1,
      name: "Admin (stub)",
      functions: [
        {
          id: 1,
          name: "Группы",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        },
        {
          id: 2,
          name: "Пользователи",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        },
        {
          id: 3,
          name: "Эффекты",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        },
        {
          id: 4,
          name: "Фильтры",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        }
      ]
    },
    {
      id: 2,
      name: "Cmsadmin",
      functions: [
        {
          id: 1,
          name: "Управлять",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        },
        {
          id: 2,
          name: "Группы",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        },
        {
          id: 3,
          name: "Настройки",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        },
        {
          id: 4,
          name: "Контейнеры",
          type: "multiple",
          actions: {
            add: 0,
            edit: 1,
            delete: 2,
            view: 0
          }
        },
        {
          id: 5,
          name: "Настройки",
          type: "simple",
          actions: {
            add: 0,
            edit: 1,
            delete: 1,
            view: 0
          }
        }
      ]
    }
  ],
  refId: null,
  errorCode: 0,
  errorMessage: "SUCCESS"
};

export {
  permissionsGroupsresponse,
  permissionsModulesResponse,
  permissionsUsersResponse
};

export const PERMISSIONS_MULTIPLE = {
  noAccess: {
    id: 0,
    name: "Нет доступа"
  },
  own: {
    id: 1,
    name: "Свои"
  },
  all: {
    id: 2,
    name: "Все"
  }
};
export const PERMISSIONS_SIMPLE = {
  noAccess: {
    id: 0,
    name: "Нет доступа"
  },
  all: {
    id: 1,
    name: "Все"
  }
};
export enum PERMISSIONS_ACTIONS {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  VIEW = "view"
}

export enum FUNCTION_TYPES {
  MUPLITPLE = "multiple",
  SINGLE = "simple"
}

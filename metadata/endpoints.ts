var endpoints = {
  inventory: {
    list: {
      path: "/inventory/list",
      method: "get"
    },
    listbelowthreshold: {
      path: "/inventory/listbelowthreshold",
      method: "get"
    },
    item: {
      update: {
        path: "/inventory/item/:id",
        method: "put",
        validation: {
          resolve: "validation",
          value: "updateItem"
        }
      },
      add: {
        path: "/inventory/item",
        method: "post"
      },
      get: {
        path: "/inventory/item/:id",
        method: "get"
      },
      remove: {
        path: "/inventory/item/:id",
        method: "delete"
      }
    }
  }
};

export = endpoints;

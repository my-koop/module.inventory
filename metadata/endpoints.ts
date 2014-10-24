var endpoints = {
  inventory: {
    list: {
      path: "/inventory/list",
      method: "get"
    },
    item: {
      getOne: {
        path: "/inventory/item/:id",
        method: "get"
      },
      getPrice: {
        path: "/inventory/item/:id/price",
        method: "get"
      },
      add: {
        path: "/inventory/item/:id",
        method: "post"
      },
      remove: {
        path: "/inventory/item/:id",
        method: "delete"
      }
    },
    something: {
      path: "/inventory/:a/something/:b/:c/else/:d",
      method: "get"
    }
  }
};

export = endpoints;

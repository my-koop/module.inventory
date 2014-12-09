import utils = require("mykoop-utils");
export function addRoutes(metaDataBuilder: utils.MetaDataBuilder) {
  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory"],
    path: "inventory",
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "createItem"],
    component: "CreateItemPage",
    name: "createItem",
    path: "create",
    permissions: {
      inventory: {
        create: true
      }
    }
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "editItem"],
    component: "EditItemPage",
    name: "editItemPage",
    path: "item/:id",
    params: {
      id: [1]
    },
    permissions: {
      inventory: {
        update: true
      }
    }
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "items"],
    component: "ItemsPage",
    name: "items",
    path: "items",
    permissions: {
      inventory: {
        read: true
      }
    }
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "itemsBelowThreshold"],
    component: "ItemsBelowThresholdPage",
    name: "itemsBelowThreshold",
    path: "itemsbelowthreshold",
    permissions: {
      inventory: {
        read: true
      }
    }
  });
}

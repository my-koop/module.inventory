import utils = require("mykoop-utils");
export function addRoutes(metaDataBuilder: utils.MetaDataBuilder) {
  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory"],
    path: "inventory",
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "createItem"],
    component: "CreateItemPage",
    name: "createItemPage",
    path: "create",
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "editItem"],
    component: "EditItemPage",
    name: "editItemPage",
    path: "item/:id",
    params: {
      id: [1]
    }
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "items"],
    component: "ItemsPage",
    name: "items",
    path: "items"
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "itemsbelowthreshold"],
    component: "ItemsBelowThresholdPage",
    name: "itemsbelowthreshold",
    path: "itemsbelowthreshold"
  });
}

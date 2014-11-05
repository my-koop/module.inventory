import utils = require("mykoop-utils");
export function addRoutes(metaDataBuilder: utils.MetaDataBuilder) {
  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "createItem"],
    component: "CreateItemPage",
    name: "createItemPage",
    path: "create",
  });


  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "items"],
    component: "ItemsPage",
    name: "items",
    path: "items"
  });
}

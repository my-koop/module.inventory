import utils = require("mykoop-utils");
export function addRoutes(metaData: utils.MetaData) {
  metaData.addFrontendRoute({
    idPath: ["public","inventory","itemPage"],
    component: "ItemsPage",
    name: "items",
    path: "inventory/items"
  });
}

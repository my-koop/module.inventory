import utils = require("mykoop-utils");
export function addRoutes(metaData: utils.MetaData) {
  metaData.addRoute({
    idPath: ["public","inventory","itemList"],
    component: "ItemList",
    name: "items",
    path: "/inventory/itemlist"
  });
}

import utils = require("mykoop-utils");
export function addRoutes(metaDataBuilder: utils.MetaDataBuilder) {
  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory"],
    path: "inventory",
  });

  metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory", "createItem"],
    i18nKey: "inventory::createItemWelcome",
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
    i18nKey: "inventory::editItemWelcome",
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
    i18nKey: "inventory::inventoryWelcome",
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
    i18nKey: "inventory::threshold",
    name: "itemsBelowThreshold",
    path: "itemsbelowthreshold",
    permissions: {
      inventory: {
        read: true
      }
    }
  });
}

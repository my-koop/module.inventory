function addRoutes(metaDataBuilder) {
    metaDataBuilder.addFrontendRoute({
        idPath: ["dashboard", "inventory", "createItem"],
        component: "CreateItemPage",
        name: "createItemPage",
        path: "create"
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
exports.addRoutes = addRoutes;

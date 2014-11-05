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
}
exports.addRoutes = addRoutes;

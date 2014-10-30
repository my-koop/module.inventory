function addRoutes(metaData) {
    metaData.addFrontendRoute({
        idPath: ["public", "inventory", "itemPage"],
        component: "ItemsPage",
        name: "items",
        path: "inventory/items"
    });
}
exports.addRoutes = addRoutes;

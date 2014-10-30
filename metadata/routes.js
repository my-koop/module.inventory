function addRoutes(metaData) {
    metaData.addRoute({
        idPath: ["public", "inventory", "itemPage"],
        component: "ItemsPage",
        name: "items",
        path: "inventory/items"
    });
}
exports.addRoutes = addRoutes;

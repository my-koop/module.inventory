function addRoutes(metaData) {
    metaData.addRoute({
        idPath: ["public", "inventory", "itemList"],
        component: "ItemList",
        name: "items",
        path: "/inventory/itemlist"
    });
}
exports.addRoutes = addRoutes;

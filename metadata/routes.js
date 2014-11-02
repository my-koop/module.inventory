function addRoutes(metaDataBuilder) {
    /*FIXME: Remove from core when done here.
    metaDataBuilder.addFrontendRoute({
    idPath: ["dashboard", "inventory"],
    component: "ParentPlaceHolder",
    path: "inventory",
    default: "ItemsPage"
    });
    */
    metaDataBuilder.addFrontendRoute({
        idPath: ["dashboard", "inventory", "items"],
        component: "ItemsPage",
        name: "items",
        path: "items"
    });
}
exports.addRoutes = addRoutes;

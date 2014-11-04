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

    metaDataBuilder.addFrontendRoute({
        idPath: ["dashboard", "inventory", "itemsbelowthreshold"],
        component: "ItemsBelowThreshold",
        name: "itemsbelowthreshold",
        path: "itemsbelowthreshold"
    });
}
exports.addRoutes = addRoutes;

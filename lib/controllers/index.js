var endpoints = require("../../metadata/endpoints");
var validation = require("../validation/index");
function readBaseItemData(req) {
    return {
        code: req.param("code", null),
        name: req.param("name", null),
        section: req.param("section", null),
        description: req.param("description", null),
        price: parseFloat(req.param("price", 0)),
        quantity: parseInt(req.param("quantity", 0)),
        threshold: parseInt(req.param("threshold", 0))
    };
}
function attachControllers(binder) {
    var inventory = binder.moduleInstance;
    binder.attach({ endPoint: endpoints.inventory.list }, binder.makeSimpleController(inventory.getItems));
    binder.attach({ endPoint: endpoints.inventory.listbelowthreshold }, binder.makeSimpleController(inventory.getItemsBelowThreshold));
    binder.attach({
        endPoint: endpoints.inventory.item.update,
        validation: validation.updateItem
    }, binder.makeSimpleController(inventory.updateItem, function (req) {
        var params = readBaseItemData(req);
        params.id = parseInt(req.param("id"));
        return params;
    }));
    binder.attach({ endPoint: endpoints.inventory.item.remove }, binder.makeSimpleController(binder.moduleInstance.deleteItem, function (req) {
        return {
            id: parseInt(req.param("id")),
        };
    }));
    binder.attach({ endPoint: endpoints.inventory.item.add }, binder.makeSimpleController(inventory.addItem, readBaseItemData));
}
exports.attachControllers = attachControllers;

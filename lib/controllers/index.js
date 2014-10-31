var metaData = require("../../metadata/index");

// Controllers.
var itemsData = require("./itemsData");
var updateItem = require("./updateItem");

var endPoints = metaData.endpoints;

function attachControllers(inventoryModuleControllers) {
    inventoryModuleControllers.attach({ endPoint: endPoints.inventory.list }, itemsData);

    inventoryModuleControllers.attach({ endPoint: endPoints.inventory.item.update }, updateItem);
}
exports.attachControllers = attachControllers;

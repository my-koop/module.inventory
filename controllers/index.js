var metaData = require("../metadata/index");

// Controllers.
var itemsData = require("./itemsData");

var endPoints = metaData.endpoints;

function attachControllers(inventoryModuleControllers) {
    inventoryModuleControllers.attach({ endPoint: endPoints.inventory.list }, itemsData);
}
exports.attachControllers = attachControllers;

var metaData = require("../../metadata/index");

// Controllers.
var itemsData = require("./itemsData");
var updateItem = require("./updateItem");
var deleteItem = require("./deleteItem");
var itemsBelowThresholdData = require("./itemsBelowThresholdData");

var endPoints = metaData.endpoints;

function attachControllers(inventoryModuleControllers) {
    inventoryModuleControllers.attach({ endPoint: endPoints.inventory.list }, itemsData);

    inventoryModuleControllers.attach({ endPoint: endPoints.inventory.item.update }, updateItem);

    inventoryModuleControllers.attach({ endPoint: endPoints.inventory.item.remove }, deleteItem);

    inventoryModuleControllers.attach({ endPoint: endPoints.inventory.listbelowthreshold }, itemsBelowThresholdData);
}
exports.attachControllers = attachControllers;

import metaData = require("../metadata/index");

// Controllers.
import itemsData = require ("./itemsData");


var endPoints = metaData.endpoints;

export function attachControllers(inventoryModuleControllers) {
  inventoryModuleControllers.attach(
    {endPoint: endPoints.inventory.list},
    itemsData
  );
}

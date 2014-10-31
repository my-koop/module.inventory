import metaData = require("../../metadata/index");

// Controllers.
import itemsData = require ("./itemsData");
import updateItem = require ("./updateItem");


var endPoints = metaData.endpoints;

export function attachControllers(inventoryModuleControllers) {
  inventoryModuleControllers.attach(
    {endPoint: endPoints.inventory.list},
    itemsData
  );

  inventoryModuleControllers.attach(
    {endPoint: endPoints.inventory.item.update},
    updateItem
  );
}

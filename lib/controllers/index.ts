import metaData = require("../../metadata/index");

// Controllers.
import itemsData                = require ("./itemsData");
import updateItem               = require ("./updateItem");
import deleteItem               = require ("./deleteItem");
import itemsBelowThresholdData  = require ("./itemsBelowThresholdData");
import validation               = require("../validation/index");
import addItem                  = require ("./addItem");

var endPoints = metaData.endpoints;

export function attachControllers(inventoryModuleControllers) {
  inventoryModuleControllers.attach(
    {endPoint: endPoints.inventory.list},
    itemsData
  );

  inventoryModuleControllers.attach(
    {
      endPoint: endPoints.inventory.item.update,
      validation: validation.updateItem
    },
    updateItem
  );

  inventoryModuleControllers.attach(
    {endPoint: endPoints.inventory.item.remove},
    deleteItem
  );

  inventoryModuleControllers.attach(
    {endPoint: endPoints.inventory.listbelowthreshold},
    itemsBelowThresholdData
  );

  inventoryModuleControllers.attach(
    {endPoint: endPoints.inventory.item.add},
    addItem
  );
}

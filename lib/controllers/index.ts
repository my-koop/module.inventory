import endpoints = require("../../metadata/endpoints");
import Express = require("express");
import utils = require("mykoop-utils");
import validation = require("../validation/index");

function readBaseItemData(req) : any {
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

export function attachControllers(
  binder: utils.ModuleControllersBinder<mkinventory.Module>
) {
  var inventory = binder.moduleInstance;
  // List items
  binder.attach(
    {
      endPoint: endpoints.inventory.list,
      permissions: {
        inventory: {
          read: true
        }
      }
    },
    binder.makeSimpleController(inventory.getItems)
  );

  // List items below threshold
  binder.attach(
    {
      endPoint: endpoints.inventory.listbelowthreshold,
      permissions: {
        inventory: {
          read: true
        }
      }
    },
    binder.makeSimpleController(inventory.getItemsBelowThreshold)
  );

  // Get Item informations
  binder.attach(
    {
      endPoint: endpoints.inventory.item.get,
      permissions: {
        inventory: {
          read: true
        }
      }
    },
    binder.makeSimpleController<mkinventory.GetItemInformations.Params>(
      inventory.getItemInformations, function(req) {
      return {
        id: parseInt(req.param("id", 0))
      }
    })
  );

  // Update item
  binder.attach(
    {
      endPoint: endpoints.inventory.item.update,
      validation: validation.itemInformation,
      permissions: {
        inventory: {
          update: true
        }
      }
    },
    binder.makeSimpleController<mkinventory.UpdateItem.Params>(
      inventory.updateItem,
      function(req: Express.Request) {
        var params = readBaseItemData(req);
        params.id = parseInt(req.param("id"))
        return params;
      }
    )
  );

  // Remove Item
  binder.attach(
    {
      endPoint: endpoints.inventory.item.remove,
      permissions: {
        inventory: {
          delete: true
        }
      }
    },
    binder.makeSimpleController<mkinventory.DeleteItem.Params>(
      binder.moduleInstance.deleteItem,
      function(req: Express.Request) {
        return {
          id: parseInt(req.param("id")),
        };
      }
    )
  );

  // Add item
  binder.attach(
    {
      endPoint: endpoints.inventory.add,
      validation: validation.itemInformation,
      permissions: {
        inventory: {
          create: true
        }
      }
    },
    binder.makeSimpleController<mkinventory.AddItem.Params>(
      inventory.addItem,
      readBaseItemData
    )
  );
}

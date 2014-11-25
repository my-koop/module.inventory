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
  binder.attach(
    {endPoint: endpoints.inventory.list},
    binder.makeSimpleController(inventory.getItems)
  );

  binder.attach(
    {endPoint: endpoints.inventory.listbelowthreshold},
    binder.makeSimpleController(inventory.getItemsBelowThreshold)
  );

  binder.attach(
    {
      endPoint: endpoints.inventory.item.update,
      validation: validation.updateItem
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

  binder.attach(
    {endPoint: endpoints.inventory.item.remove},
    binder.makeSimpleController<mkinventory.DeleteItem.Params>(
      binder.moduleInstance.deleteItem,
      function(req: Express.Request) {
        return {
          id: parseInt(req.param("id")),
        };
      }
    )
  );

  binder.attach(
    {endPoint: endpoints.inventory.item.add},
    binder.makeSimpleController<mkinventory.AddItem.Params>(
      inventory.addItem,
      readBaseItemData
    )
  );
}

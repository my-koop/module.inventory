import express = require("express");
import Item = require("../classes/Item");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);

function updateItem(req: express.Request, res: express.Response) {
  var self: mkinventory.Module = this;
  var data = {
    id: parseInt(req.param("id")),
    name: req.param("name"),
    code: parseInt(req.param("code")),
    price: parseFloat(req.param("price")),
    threshold: parseInt(req.param("threshold")),
    quantityStock: parseInt(req.param("quantityStock"))
  }

  self.updateItem(data, function(err) {
    if (err) {
      logger.error(err);
      return res.sendStatus(500);
    }

    res.end();
  });
};

export = updateItem;

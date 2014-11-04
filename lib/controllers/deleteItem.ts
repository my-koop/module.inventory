import express = require("express");
import Item = require("../classes/Item");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);

function deleteItem(req: express.Request, res: express.Response) {
  var idItem = parseInt(req.param("id"));
  this.deleteItem(idItem, function(err) {
    if (err) {
      logger.error(err);
      return res.sendStatus(500);
    }

    res.end();
  });
};

export = deleteItem;

import express = require("express");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);

function deleteItem(req: express.Request, res: express.Response) {
  var self: mkinventory.Module = this;
  var idItem = parseInt(req.param("id"));
  self.deleteItem(idItem, function(err) {
    if (err) {
      logger.error(err);
      return res.sendStatus(500);
    }

    res.end();
  });
};

export = deleteItem;

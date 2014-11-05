import express = require("express");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);

function addItem(req: express.Request, res: express.Response) {
  var self: mkinventory.Module = this;
  var data = {
    name: req.param("name"),
    code: parseInt(req.param("code")),
    price: parseFloat(req.param("price")),
    threshold: parseInt(req.param("threshold"))
  };

  self.addItem(data, function(err) {
    if (err) {
      logger.error(err);
      return res.sendStatus(500);
    }

    res.end();
  });
};

export = addItem;

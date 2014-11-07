import express = require("express");
import ItemAdmin = require("../classes/ItemAdmin");
import utils = require("mykoop-utils");
var logger = utils.getLogger(module);

function getItemsData(req: express.Request, res: express.Response) {
  var self: mkinventory.Module = this;
  self.getItemsData(function(err, items: ItemAdmin[]) {
    if (err) {
      logger.error(err);
      res.error(err);
      return;
    }

    res.send({
      items: items
    });
  });
};

export = getItemsData;

import express = require("express");
import ItemAdmin = require("../classes/ItemAdmin");

function getItemsBelowThresholdData(req: express.Request, res: express.Response) {
  var self: mkinventory.Module = this;
  self.getItemsBelowThresholdData(function(err, items: ItemAdmin[]) {
    if (err) {
      res.send(500);
      return;
    }

    res.send({
      items: items
    });
  });
};

export = getItemsBelowThresholdData;

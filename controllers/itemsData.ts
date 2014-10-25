import express = require("express");
import ItemAdmin = require("../classes/ItemAdmin");

function getItemsData(req: express.Request, res: express.Response) {
  this.getItemsData(function(err, items: ItemAdmin[]) {
    if (err) {
      res.send(500);
      return;
    }

    res.send({
      items: items
    });
  });
};

export = getItemsData;

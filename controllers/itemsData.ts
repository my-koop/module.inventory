import express = require("express");
import Item = require("../classes/Item");

function getItemsData(req: express.Request, res: express.Response) {
  this.getItemsData(function(err, items: Item[]) {
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

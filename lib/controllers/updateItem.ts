import express = require("express");
import Item = require("../classes/Item");

function updateItem(req: express.Request, res: express.Response) {
  var t = {
    name: req.body.name,
    price: req.body.price
  }

  this.updateItem(t, req.params.id, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.end();
  });
};

export = updateItem;

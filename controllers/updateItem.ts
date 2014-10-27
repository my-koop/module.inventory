import express = require("express");
import Item = require("../classes/Item");

function updateItem(req: express.Request, res: express.Response) {
   this.updateItem(req.body, req.params.id, function(err) {
   	if (err) {
      res.send(500);
      return;
    }

    res.send({});
   });
};

export = updateItem;

import express = require("express");
import Item = require("../classes/Item");

function updateItem(req: express.Request, res: express.Response) {
   this.updateItem(req.body, req.params.id, function(err) {
   	if (err) {
      return res.sendStatus(500);
    }

    res.end();
   });
};

export = updateItem;

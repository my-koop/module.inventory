import express = require('express');
import Item = require("../classes/Item");

function ItemsData(db: mkdatabase.Module, req: express.Request, res: express.Response) {

  var items = [];
  if(db){
    db.getConnection(function(err, connection) {
      connection.query('SELECT * FROM item_list', function(err, rows) {
        if (err) throw err;

        for (var i in rows) {
          var currItem = rows[i];
          items.push(new Item(currItem['id'], currItem['code'], currItem['quantityStock'], currItem['code']));
        }
        res.json(
         items
        );
      });
    });
  }
  
};

export = ItemsData;

import path = require("path");
import express = require("express");
import mysql = require("mysql");
import controllerList = require("../controllers/index");
import utils = require("mykoop-utils");

import ItemAdmin = require("../classes/ItemAdmin");

class InventoryModule extends utils.BaseModule implements mkinventory.Module {
  private db: mkdatabase.Module;

  init() {
    var self = this;

    this.db = <mkdatabase.Module>this.getModuleManager().get("database");
    controllerList.attachControllers(new utils.ModuleControllersBinder(this));
  }

  getItemsData(callback: (err: Error, result: ItemAdmin[]) => void) {
    var items = [];

    this.db.getConnection(function(err, connection, cleanup) {
      var query = connection.query(
        "SELECT ?? FROM ??",
        [ItemAdmin.COLUMNS_ADMIN, "item_list"],
        function(err, rows) {
          if (err){
            throw err;
          }

          // We cleanup already because we don't need the connection anymore.
          cleanup();

          for (var i in rows) {
            var currItem = rows[i];
             items.push(new ItemAdmin(currItem));
          }

          callback(null, items);
      });
    });
  }
}

export = InventoryModule;

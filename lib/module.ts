import path = require("path");
import express = require("express");
import mysql = require("mysql");
import InventoryModuleControllers = require("./controllers");
import controllerList = require("../controllers/index");

import Item = require("../classes/Item");

class InventoryModule implements mkinventory.Module {
  private moduleManager: mykoop.ModuleManager;
  private db: mkdatabase.Module;
  private controllers: any;

  init(moduleManager: mykoop.ModuleManager){
    var self = this;

    this.moduleManager = moduleManager;
    var db = <mkdatabase.Module>this.moduleManager.get("database");

    this.controllers = new InventoryModuleControllers(this);
    controllerList.attachControllers(this.controllers);

    if (db) {
      this.db = db;
    }
  }

  getModuleManager(): mykoop.ModuleManager {
    return this.moduleManager;
  }

  getItemsData(callback: (err: Error, result: Item[]) => void) {
    var items = [];

    this.db.getConnection(function(err, connection) {
      var query = connection.query(
        "SELECT ?? FROM ??",
        [
          ["id", "code", "quantityStock", "code"],
          "item_list"
        ], function(err, rows) {
          if (err){
            throw err;
          }

          for (var i in rows) {
            var currItem = rows[i];
            items.push(
              new Item(
                currItem.id,
                currItem.code,
                currItem.quantityStock,
                currItem.code
              )
            );
          }

          callback(null, items);
      });
    });
  }
}

export = InventoryModule;

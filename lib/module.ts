import path = require("path");
import express = require("express");
import mysql = require("mysql");
import InventoryModuleControllers = require("./controllers");
import controllerList = require("../controllers/index");

import ItemAdmin = require("../classes/ItemAdmin");

class InventoryModule implements mkinventory.Module {
  private moduleManager: mykoop.ModuleManager;
  private db: mkdatabase.Module;
  private controllers: InventoryModuleControllers;

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

  updateItem(updateData, id, callback: (err?: Error) => void) {
    console.log("update data:", updateData);
    console.log("update on ID:", id);

    this.db.getConnection(function(err, connection, cleanup) {
      var query = connection.query(
        "UPDATE item SET ? WHERE idItem = ?",
        [updateData, id],
        function(err) {
          if (err){
            throw err;
          }

          // We cleanup already because we don't need the connection anymore.
          cleanup();

          callback();
      });
    });
  }
}

export = InventoryModule;

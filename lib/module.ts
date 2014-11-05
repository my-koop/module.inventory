import path = require("path");
import express = require("express");
import mysql = require("mysql");
import controllerList = require("./controllers/index");
import utils = require("mykoop-utils");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);
import ItemAdmin = require("./classes/ItemAdmin");
import ItemPublic = require("./classes/ItemPublic");
import validation = require("./validation/index");

class InventoryModule extends utils.BaseModule implements mkinventory.Module {
  private db: mkdatabase.Module;

  init() {
    var self = this;

    this.db = <mkdatabase.Module>this.getModuleManager().get("database");
    controllerList.attachControllers(new utils.ModuleControllersBinder(this));
  }

  getItemsData(callback: (err: Error, result?: ItemAdmin[]) => void) {
    var items = [];

    this.db.getConnection(function(err, connection, cleanup) {
      if(err) {
        return callback(err);
      }
      var query = connection.query(
        "SELECT ?? FROM ??",
        [ItemAdmin.COLUMNS_ADMIN, "item_list"],
        function(err, rows) {
          // We cleanup already because we don't need the connection anymore.
          cleanup();

          if (err) {
            return callback(err);
          }

          for (var i in rows) {
            var currItem = rows[i];
             items.push(new ItemAdmin(currItem));
          }

          callback(null, items);
      });
    });
  }

  getItemsBelowThresholdData(callback: (err: Error, result?: ItemAdmin[]) => void) {
    var items = [];

    this.db.getConnection(function(err, connection, cleanup) {
      if(err) {
        return callback(err);
      }
      var query = connection.query(
        "SELECT ?? FROM ?? where quantityStock < threshold",
        [ItemAdmin.COLUMNS_ADMIN, "item_list"],
        function(err, rows) {
          cleanup();

          if (err) {
            return callback(err);
          }

          for (var i in rows) {
            var currItem = rows[i];
             items.push(new ItemAdmin(currItem));
          }

          callback(null, items);
      });
    });
  }

  updateItem(data: InventoryInterfaces.UpdateItemData, callback: (err?: Error) => void) {

    var validationErrors = validation.updateItem(data);
    if (validationErrors) {
      logger.error(validationErrors);
      return callback(new Error("Invalid data"));
    }

    var queryData: InventoryDbQueryStruct.ItemData = {
      name: data.name,
      price: data.price,
      code: data.code,
      threshold: data.threshold
    };
    var id = data.id;

    this.db.getConnection(function(err, connection, cleanup) {
      if(err) {
        return callback(err);
      }

      var query = connection.query(
        "UPDATE item SET ? WHERE idItem = ?",
        [queryData, id],
        function(err) {
          // We cleanup already because we don't need the connection anymore.
          cleanup();

          if (err) {
            return callback(err);
          }
          // TODO:: Return updated item data
          callback();
      });
    });
  }


  deleteItem(id: Number, callback: (err?: Error) => void) {
    this.db.getConnection(function(err, connection, cleanup) {
      if(err) {
        return callback(err);
      }
      var query = connection.query(
        "DELETE from item WHERE idItem = ?",
        [id],
        function(err) {
          // We cleanup already because we don't need the connection anymore.
          cleanup();

          if (err) {
            return callback(err);
          }

          callback();
      });
    });
  }
}

export = InventoryModule;

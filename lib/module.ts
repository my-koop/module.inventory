import controllerList = require("./controllers/index");
import utils = require("mykoop-utils");
import Item = require("./classes/Item");
import _ = require("lodash");

var DatabaseError = utils.errors.DatabaseError;
var ApplicationError = utils.errors.ApplicationError;

class InventoryModule extends utils.BaseModule implements mkinventory.Module {
  private db: mkdatabase.Module;

  init() {
    var self = this;
    this.db = <mkdatabase.Module>this.getModuleManager().get("database");
    controllerList.attachControllers(new utils.ModuleControllersBinder(this));
  }

  getItemInformations (
    params: mkinventory.GetItemInformations.Params,
    callback: mkinventory.GetItemInformations.Callback
  ) {
    this.callWithConnection(
      this.__getItemInformations,
      params,
      callback
    );
  }

  __getItemInformations (
    connection: mysql.IConnection,
    params: mkinventory.GetItemInformations.Params,
    callback: mkinventory.GetItemInformations.Callback
  ) {
    connection.query(
      "SELECT ?? FROM item WHERE id = ?",
      [Item.COLUMNS_DB, params.id],
      function(err, rows) {
        if(err) {
          return callback(new DatabaseError(err));
        }
        if(rows.length !== 1) {
          return callback(new ApplicationError(null, {id: "notFound"}));
        }
        callback(null, {
          item: new Item(rows[0])
        });
      }
    );
  }

  getItems (
    params: mkinventory.GetItems.Params,
    callback: mkinventory.GetItems.Callback
  ) {
    this.callWithConnection(
      this.__getItems,
      params,
      callback
    )
  }

  __getItems (
    connection: mysql.IConnection,
    params: mkinventory.GetItems.Params,
    callback: mkinventory.GetItems.Callback
  ) {
    var whereCondition = params.selectCondition ?
      "AND " + params.selectCondition : "";
    connection.query(
      "SELECT ?? FROM item WHERE deleted IS NULL " +
      whereCondition,
      [Item.COLUMNS_DB],
      function(err, rows) {
        callback(err && new DatabaseError(err), {
          items: _.map(rows, function(row) {
            return new Item(row);
          })
        });
      }
    );
  }

  getItemsBelowThreshold (
    params: mkinventory.GetItemsBelowThreshold.Params,
    callback: mkinventory.GetItemsBelowThreshold.Callback
  ) {
    this.callWithConnection(
      this.__getItems,
      _.assign(params, {selectCondition: "quantity < threshold"}),
      callback
    );
  }

  updateItem (
    params: mkinventory.UpdateItem.Params,
    callback: mkinventory.UpdateItem.Callback
  ) {
    this.callWithConnection(
      this.__updateItem,
      params,
      callback
    );
  }

  __updateItem (
    connection: mysql.IConnection,
    params: mkinventory.UpdateItem.Params,
    callback: mkinventory.UpdateItem.Callback
  ) {
    var data = _.pick(params,
      // select all columns except id
      Item.COLUMNS_DB.slice(1)
    );

    connection.query(
      "UPDATE item SET ? WHERE id = ?",
      [data, params.id],
      function(err) {
        callback(err && new DatabaseError(err));
      }
    );
  }

  deleteItem (
    params: mkinventory.DeleteItem.Params,
    callback: mkinventory.DeleteItem.Callback
  ) {
    this.callWithConnection(
      this.__deleteItem,
      params,
      callback
    );
  }

  __deleteItem (
    connection: mysql.IConnection,
    params: mkinventory.DeleteItem.Params,
    callback: mkinventory.DeleteItem.Callback
  ) {
    connection.query(
      "UPDATE item SET deleted=1 WHERE id = ?",
      [params.id],
      function(err) {
        callback(err && new DatabaseError(err));
    });
  }

  addItem (
    params: mkinventory.AddItem.Params,
    callback: mkinventory.AddItem.Callback
  ) {
    this.callWithConnection(
      this.__addItem,
      params,
      callback
    );
  }

  __addItem (
    connection: mysql.IConnection,
    params: mkinventory.AddItem.Params,
    callback: mkinventory.AddItem.Callback
  ) {
    var data = _.pick(params,
      // select all columns except id
      Item.COLUMNS_DB.slice(1)
    );

    connection.query(
      "INSERT INTO item SET ?",
      [data],
      function(err, result) {
        callback(
          err && new DatabaseError(err),
          { id: result ? result.insertId : null }
        );
      }
    );
  }
}

export = InventoryModule;

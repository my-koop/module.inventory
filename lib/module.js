var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controllerList = require("./controllers/index");
var utils = require("mykoop-utils");
var Item = require("./classes/Item");
var _ = require("lodash");
var DatabaseError = utils.errors.DatabaseError;
var ApplicationError = utils.errors.ApplicationError;
var InventoryModule = (function (_super) {
    __extends(InventoryModule, _super);
    function InventoryModule() {
        _super.apply(this, arguments);
    }
    InventoryModule.prototype.init = function () {
        var self = this;
        this.db = this.getModuleManager().get("database");
        controllerList.attachControllers(new utils.ModuleControllersBinder(this));
    };
    InventoryModule.prototype.getItemInformations = function (params, callback) {
        this.callWithConnection(this.__getItemInformations, params, callback);
    };
    InventoryModule.prototype.__getItemInformations = function (connection, params, callback) {
        connection.query("SELECT ?? FROM item WHERE id = ?", [Item.COLUMNS_DB, params.id], function (err, rows) {
            if (err) {
                return callback(new DatabaseError(err));
            }
            if (rows.length !== 1) {
                return callback(new ApplicationError(null, { id: "notFound" }));
            }
            callback(null, {
                item: new Item(rows[0])
            });
        });
    };
    InventoryModule.prototype.getItems = function (params, callback) {
        this.callWithConnection(this.__getItems, params, callback);
    };
    InventoryModule.prototype.__getItems = function (connection, params, callback) {
        var whereCondition = params.selectCondition ? "WHERE " + params.selectCondition : "";
        connection.query("SELECT ?? FROM item " + whereCondition, [Item.COLUMNS_DB], function (err, rows) {
            callback(err && new DatabaseError(err), {
                items: _.map(rows, function (row) {
                    return new Item(row);
                })
            });
        });
    };
    InventoryModule.prototype.getItemsBelowThreshold = function (params, callback) {
        this.callWithConnection(this.__getItems, _.assign(params, { selectCondition: "quantity < threshold" }), callback);
    };
    InventoryModule.prototype.updateItem = function (params, callback) {
        this.callWithConnection(this.__updateItem, params, callback);
    };
    InventoryModule.prototype.__updateItem = function (connection, params, callback) {
        var data = _.pick(params, Item.COLUMNS_DB.slice(1));
        connection.query("UPDATE item SET ? WHERE id = ?", [data, params.id], function (err) {
            callback(err && new DatabaseError(err));
        });
    };
    InventoryModule.prototype.deleteItem = function (params, callback) {
        this.callWithConnection(this.__deleteItem, params, callback);
    };
    InventoryModule.prototype.__deleteItem = function (connection, params, callback) {
        connection.query("DELETE from item WHERE id = ?", [params.id], function (err) {
            callback(err && new DatabaseError(err));
        });
    };
    InventoryModule.prototype.addItem = function (params, callback) {
        this.callWithConnection(this.__addItem, params, callback);
    };
    InventoryModule.prototype.__addItem = function (connection, params, callback) {
        var data = _.pick(params, Item.COLUMNS_DB.slice(1));
        connection.query("INSERT INTO item SET ?", [data], function (err, result) {
            callback(err && new DatabaseError(err), { id: result ? result.insertId : null });
        });
    };
    return InventoryModule;
})(utils.BaseModule);
module.exports = InventoryModule;

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controllerList = require("../controllers/index");
var utils = require("mykoop-utils");

var ItemAdmin = require("../classes/ItemAdmin");

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

    InventoryModule.prototype.getItemsData = function (callback) {
        var items = [];

        this.db.getConnection(function (err, connection, cleanup) {
            var query = connection.query("SELECT ?? FROM ??", [ItemAdmin.COLUMNS_ADMIN, "item_list"], function (err, rows) {
                if (err) {
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
    };

    InventoryModule.prototype.updateItem = function (updateData, id, callback) {
        this.db.getConnection(function (err, connection, cleanup) {
            var query = connection.query("UPDATE item SET ?? WHERE id = ??", [updateData, id], function (err, rows) {
                if (err) {
                    throw err;
                }

                // We cleanup already because we don't need the connection anymore.
                cleanup();

                callback(null, null);
            });
        });
    };
    return InventoryModule;
})(utils.BaseModule);

module.exports = InventoryModule;

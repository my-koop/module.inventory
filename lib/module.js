var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controllerList = require("../controllers/index");
var utils = require("mykoop-utils");
var getLogger = require("mykoop-logger");
var logger = getLogger(module);
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
    };

    InventoryModule.prototype.updateItem = function (updateData, id, callback) {
        logger.verbose("update data:", updateData);
        logger.verbose("update on ID:", id);

        this.db.getConnection(function (err, connection, cleanup) {
            var query = connection.query("UPDATE item SET ? WHERE idItem = ?", [updateData, id], function (err) {
                // We cleanup already because we don't need the connection anymore.
                cleanup();

                if (err) {
                    return callback(err);
                }

                callback();
            });
        });
    };
    return InventoryModule;
})(utils.BaseModule);

module.exports = InventoryModule;

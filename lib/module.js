var InventoryModuleControllers = require("./controllers");
var controllerList = require("../controllers/index");
var ItemAdmin = require("../classes/ItemAdmin");

var InventoryModule = (function () {
    function InventoryModule() {
    }
    InventoryModule.prototype.init = function (moduleManager) {
        var self = this;

        this.moduleManager = moduleManager;
        var db = this.moduleManager.get("database");

        this.controllers = new InventoryModuleControllers(this);
        controllerList.attachControllers(this.controllers);

        if (db) {
            this.db = db;
        }
    };

    InventoryModule.prototype.getModuleManager = function () {
        return this.moduleManager;
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
        console.log("update data:", updateData);
        console.log("update on ID:", id);

        this.db.getConnection(function (err, connection, cleanup) {
            var query = connection.query("UPDATE item SET ? WHERE idItem = ?", [updateData, id], function (err) {
                if (err) {
                    throw err;
                }

                // We cleanup already because we don't need the connection anymore.
                cleanup();

                callback();
            });
        });
    };
    return InventoryModule;
})();

module.exports = InventoryModule;

var InventoryModuleControllers = require("./controllers");
var controllerList = require("../controllers/index");

var Item = require("../classes/Item");

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

        this.db.getConnection(function (err, connection) {
            var query = connection.query("SELECT ?? FROM ??", [
                ["id", "code", "quantityStock", "code"],
                "item_list"
            ], function (err, rows) {
                if (err) {
                    throw err;
                }

                for (var i in rows) {
                    var currItem = rows[i];
                    items.push(new Item(currItem.id, currItem.code, currItem.quantityStock, currItem.code));
                }

                callback(null, items);
            });
        });
    };
    return InventoryModule;
})();

module.exports = InventoryModule;

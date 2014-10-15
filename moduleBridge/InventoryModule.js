var itemsData = require("../lib/itemsData");
var InventoryModule = (function () {
    function InventoryModule() {
    }
    InventoryModule.prototype.init = function (moduleManager) {
        this.moduleManager = moduleManager;
        var routerModule = this.moduleManager.get("router");
        routerModule.addRoutes(function (router) {
            router.get("/items", itemsData);
            return "/inventory";
        });
        var db = this.moduleManager.get("database");
        if (db) {
            this.db = db;
        }
    };
    InventoryModule.prototype.get = function () {
        return "trollolol";
    };
    return InventoryModule;
})();
module.exports = InventoryModule;

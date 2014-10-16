var itemsData = require("../lib/itemsData");
var InventoryModule = (function () {
    function InventoryModule() {
    }
    InventoryModule.prototype.init = function (moduleManager) {
        this.moduleManager = moduleManager;
        var db = this.moduleManager.get("database");
        var routerModule = this.moduleManager.get("router");
        routerModule.addRoutes(function (router) {
            router.get("/items", itemsData.bind(null, db));
            return "/inventory";
        });
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

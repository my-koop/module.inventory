var InventoryModule = (function () {
    function InventoryModule() {
    }
    InventoryModule.prototype.init = function (moduleManager) {
        this.moduleManager = moduleManager;
        var routerModule = this.moduleManager.get("router");
        routerModule.addRoutes(function (router) {
            router.get("/items", function (req, res, next) {
                console.log("successfully routed to /inventory/items");
                res.end();
                next();
            });
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

var ModuleBridge = (function () {
    function ModuleBridge() {
        this.instance = new InventoryModule();
    }
    ModuleBridge.prototype.onAllModulesLoaded = function (moduleManager) {
        console.log("Hey hey im the inventory and im ready to rumble");
        this.instance.init(moduleManager);
    };

    ModuleBridge.prototype.getModule = function () {
        return this.instance;
    };

    ModuleBridge.prototype.getStyles = function () {
        return null;
    };

    ModuleBridge.prototype.getReactComponents = function () {
        return null;
    };
    return ModuleBridge;
})();

var inv = new ModuleBridge();
module.exports = inv;

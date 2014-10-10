var InventoryModule = (function () {
    function InventoryModule() {
    }
    InventoryModule.prototype.init = function (moduleManager) {
        this.moduleManager = moduleManager;
        var app = this.moduleManager.get("WebServer");
        //app.get("/items",)
    };

    InventoryModule.prototype.getItem = function () {
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
    return ModuleBridge;
})();

var inv = new ModuleBridge();
module.exports = inv;

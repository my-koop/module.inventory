var InventoryModule = require("./InventoryModule");
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
module.exports = ModuleBridge;

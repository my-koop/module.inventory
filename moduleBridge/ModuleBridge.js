var InventoryModule = require("./InventoryModule");
var ModuleBridge = (function () {
    function ModuleBridge() {
        this.instance = new InventoryModule();
    }
    ModuleBridge.prototype.onAllModulesInitialized = function (moduleManager) {
        console.log("Hey hey im the inventory and im ready to rumble");
        this.instance.init(moduleManager);
    };
    ModuleBridge.prototype.getModule = function () {
        return this.instance;
    };
    return ModuleBridge;
})();
module.exports = ModuleBridge;

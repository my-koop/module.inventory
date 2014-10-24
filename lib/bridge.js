var InventoryModule = require("./module");
var metaData = require("../metadata/index");

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

    ModuleBridge.prototype.getMetaData = function (callback) {
        callback(null, metaData);
    };
    return ModuleBridge;
})();

var bridge = new ModuleBridge();
module.exports = bridge;

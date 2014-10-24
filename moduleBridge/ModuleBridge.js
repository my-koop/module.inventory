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

    ModuleBridge.prototype.getMetaData = function (callback) {
        callback(null, {
            routes: {
                public: {
                    children: {
                        inventory: {
                            children: {
                                itemList: {
                                    handler: {
                                        resolve: "component",
                                        value: "ItemList"
                                    },
                                    name: "items",
                                    path: "/Dashboard/Items"
                                }
                            }
                        }
                    }
                }
            },
            translations: require("../locales")
        });
    };
    return ModuleBridge;
})();

module.exports = ModuleBridge;

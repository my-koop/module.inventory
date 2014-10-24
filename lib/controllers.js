var InventoryModuleControllers = (function () {
    function InventoryModuleControllers(inventory) {
        this.inventory = inventory;
        this.moduleManager = this.inventory.getModuleManager();
        this.routerModule = this.moduleManager.get("router");
    }
    InventoryModuleControllers.prototype.attach = function (params, controller) {
        this.routerModule.addRoute(params, controller.bind(this.inventory));
    };
    return InventoryModuleControllers;
})();

module.exports = InventoryModuleControllers;

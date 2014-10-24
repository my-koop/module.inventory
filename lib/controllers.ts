class InventoryModuleControllers {
  private moduleManager: mykoop.ModuleManager;
  private inventory: mkinventory.Module;
  private routerModule: any;

  constructor(inventory: mkinventory.Module) {
    this.inventory = inventory;
    this.moduleManager = this.inventory.getModuleManager();
    this.routerModule = <mykoop.Router>this.moduleManager.get("router");
  }

  attach(
    params: any,
    controller: (
      req: express.Request,
      res: express.Response,
      next?: Function
    ) => void
  ) {
    this.routerModule.addRoute(params, controller.bind(this.inventory));
  }
}

export = InventoryModuleControllers;

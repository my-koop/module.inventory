import InventoryModule = require("./module");
import metaData = require("../metadata/index");

class ModuleBridge implements mykoop.IModuleBridge {
  instance: InventoryModule;

  constructor() {
    this.instance = new InventoryModule();
  }

  onAllModulesInitialized() {
    this.instance.init();
  }

  getModule() : mykoop.IModule {
    return this.instance;
  }

  getMetaData(callback: mykoop.ModuleMetaDataCallback): void {
    callback(null, metaData);
  }
}

var bridge: mykoop.IModuleBridge = new ModuleBridge();
export = bridge;

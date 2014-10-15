import InventoryModule = require("./InventoryModule");

class ModuleBridge implements mykoop.IModuleBridge {
  instance: InventoryModule;

  constructor(){
    this.instance = new InventoryModule();
  }

  onAllModulesLoaded(moduleManager: mykoop.ModuleManager){
    console.log("Hey hey im the inventory and im ready to rumble");
    this.instance.init(moduleManager);
  }

  getModule() : mykoop.IModule {
    return this.instance;
  }

  getStyles(): string[] {
    return null;
  }

  getReactComponents(): string[] {
    return null;
  }
}

export = ModuleBridge;
/// <reference path="typings/tsd.d.ts" />
import express = require("express");

class InventoryModule implements mkinventory.Module {
  moduleManager: mykoop.ModuleManager;
  db: mkdatabase.Module;

  init(moduleManager: mykoop.ModuleManager){
    this.moduleManager = moduleManager;
    var routerModule = <any>this.moduleManager.get("router");
    routerModule.addRoutes(function(router: express.Router){
      router.get("/items", function(req,res,next){
        console.log("successfully routed to /inventory/items");
        res.end();
        next();
      });
      return "/inventory";
    });

    var db = <mkdatabase.Module>this.moduleManager.get("database");
    if(db){
      this.db = db;
    }
  }

  get(): string {
    return "trollolol";
  }

}


class ModuleBridge implements mykoop.IModuleBridge {
  instance: InventoryModule;

  constructor(){
    this.instance = new InventoryModule();
  }

  onAllModulesInitialized(moduleManager: mykoop.ModuleManager){
    console.log("Hey hey im the inventory and im ready to rumble");
    this.instance.init(moduleManager);
  }

  getModule() : mykoop.IModule {
    return this.instance;
  }
}

var inv: mykoop.IModuleBridge = new ModuleBridge();
export = inv;


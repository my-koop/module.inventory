import express = require("express");
import itemsData = require ("../lib/itemsData");

class InventoryModule implements mkinventory.Module {
  moduleManager: mykoop.ModuleManager;
  db: mkdatabase.Module;

  init(moduleManager: mykoop.ModuleManager){
    this.moduleManager = moduleManager;
    var routerModule = <any>this.moduleManager.get("router");
    routerModule.addRoutes(function(router: express.Router){
      router.get("/items",itemsData);
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

export = InventoryModule;
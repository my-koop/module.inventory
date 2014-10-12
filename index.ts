/// <reference path="typings/tsd.d.ts" />
import express = require("express");
import mykoop = require("mykoop");
import mkinventory = require("mykoop-inventory");
import mkdatabase = require("mykoop-database");

class InventoryModule implements mkinventory {
  moduleManager: mykoop.ModuleManager;
  db: mkdatabase;

  init(moduleManager: mykoop.ModuleManager){
    this.moduleManager = moduleManager;
    var app = <express.Express>this.moduleManager.get("WebServer");
    var db = <mkdatabase>this.moduleManager.get("database");
    if(db){
      this.db = db;
    }
    //app.get("/items",)
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

var inv: mykoop.IModuleBridge = new ModuleBridge();
export = inv;


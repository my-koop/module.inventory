/// <reference path="typings/tsd.d.ts" />
import express = require("express");
import mykoop = require("mykoop");

class InventoryModule implements mykoop.IModule {
  moduleManager: mykoop.ModuleManager;

  init(moduleManager: mykoop.ModuleManager){
    this.moduleManager = moduleManager;
    var app = <express.Express>this.moduleManager.get("WebServer");
    //app.get("/items",)
  }

  getItem(): string {
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
}

var inv: mykoop.IModuleBridge = new ModuleBridge();
export = inv;


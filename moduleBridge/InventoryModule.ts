import express = require("express");
import itemsData = require ("../lib/itemsData");
import mysql = require('mysql');
import Item = require("../classes/Item");

class InventoryModule implements mkinventory.Module {
  moduleManager: mykoop.ModuleManager;
  db: mkdatabase.Module;

  init(moduleManager: mykoop.ModuleManager){
    this.moduleManager = moduleManager;
    var db = <mkdatabase.Module>this.moduleManager.get("database");
    var routerModule = <any>this.moduleManager.get("router");
    routerModule.addRoutes(function(router: express.Router){
      router.get("/items",itemsData.bind(null,db));
      return "/inventory";
    });

    if(db){
      this.db = db;
    }
  }

  get(): string {
    return "trollolol";
  }
}

export = InventoryModule;
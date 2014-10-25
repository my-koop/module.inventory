// Type definitions for inventory v0.0.0
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

/// <reference path="../mykoop/mykoop.d.ts" />

declare module mykoop {
  export interface IModule {}
}

declare module mkinventory {

  export class Module implements mykoop.IModule{
    getModuleManager(): mykoop.ModuleManager;
    getItemsData(callback: (err: Error, result: ItemAdmin[]) => void);
  }

  export class ItemAdmin {
    COLUMNS_ADMIN   : string[];
    //Fix me : To be moved when ItemPublic is created
    COLUMNS_PUBLIC  : string[];
    id              : number;
    name            : string;
    quantityStock   : number;
    quantityReserved: number;
    code            : string;
  }
}


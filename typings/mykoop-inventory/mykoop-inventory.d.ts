// Type definitions for inventory v0.0.0
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

/// <reference path="../mykoop/mykoop.d.ts" />

declare module mykoop {
  export interface IModule {}
}

declare module mkinventory {
  export interface Module extends mykoop.IModule{
    getItemsData(callback: (err: Error, result: Item[]) => void);
    updateItem(updateData, id, callback: (err: Error, result: Item[]) => void);
  }

  export interface ItemAdmin extends Item {
    quantityStock   : number;
    quantityReserved: number;
  }

  export interface ItemPublic extends Item {
    quantityAvailable: number;
  }

  export interface Item {
    id              : number;
    name            : string;
    code            : number;
    price           : number;
  }
}


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

  export class Item {
    id              : number;
    name            : string;
    quantityStock   : number;
    quantityReserved: number;
    code            : string;
    price           : number;
  }
}


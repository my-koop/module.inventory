// Type definitions for inventory v0.0.0
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

/// <reference path="../mykoop/mykoop.d.ts" />
/// <reference path="./interfaces.d.ts" />

declare module mkinventory {
  export interface Module extends mykoop.IModule{
    getItemsData(
      callback: (err: Error, result: Item[]) => void
    );
    updateItem(
      updateData: InventoryInterfaces.UpdateItemData,
      callback: (err: Error, result: Item[]) => void
    );
    getItemsBelowThresholdData(
      callback: (err: Error, result: Item[]) => void
    );
    deleteItem(
      idItem : Number,
      callback: (err: Error, result: Item[]) => void
    );
    addItem(
      updateData: InventoryInterfaces.AddItemData,
      callback: (err: Error) => void
    );
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
    threshold       : number;
  }
}


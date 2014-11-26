// Type definitions for inventory v0.0.0
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

/// <reference path="../mykoop/mykoop.d.ts" />
/// <reference path="./interfaces.d.ts" />

declare module mkinventory {
  export interface Module extends mykoop.IModule{
    getItemInformations (
      params: mkinventory.GetItemInformations.Params,
      callback: mkinventory.GetItemInformations.Callback
    );
    __getItemInformations (
      connection: mysql.IConnection,
      params: mkinventory.GetItemInformations.Params,
      callback: mkinventory.GetItemInformations.Callback
    );

    getItems (
      params: GetItems.Params,
      callback: GetItems.Callback
    );
    __getItems (
      connection: mysql.IConnection,
      params: GetItems.Params,
      callback: GetItems.Callback
    );

    getItemsBelowThreshold (
      params: GetItemsBelowThreshold.Params,
      callback: GetItemsBelowThreshold.Callback
    );

    addItem (
      params: AddItem.Params,
      callback: AddItem.Callback
    );
    __addItem (
      connection: mysql.IConnection,
      params: AddItem.Params,
      callback: AddItem.Callback
    );

    updateItem (
      params: UpdateItem.Params,
      callback: UpdateItem.Callback
    );
    __updateItem (
      connection: mysql.IConnection,
      params: UpdateItem.Params,
      callback: UpdateItem.Callback
    );

    deleteItem (
      params: DeleteItem.Params,
      callback: DeleteItem.Callback
    );
    __deleteItem (
      connection: mysql.IConnection,
      params: DeleteItem.Params,
      callback: DeleteItem.Callback
    );
  }


}


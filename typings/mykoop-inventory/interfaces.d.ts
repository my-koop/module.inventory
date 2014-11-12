

declare module InventoryInterfaces {

  export interface UpdateItemData {
    id: number;
    code: number;
    name: string;
    price: number;
    threshold: number;
    quantityStock: number;
  }

  export interface AddItemData {
    code: number;
    name: string;
    price: number;
    threshold: number;
  }

}

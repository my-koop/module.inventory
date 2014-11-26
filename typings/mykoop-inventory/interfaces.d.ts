

declare module mkinventory {

  export interface NewItem {
    code?: string;
    name?: string;
    section?: string;
    description?: string;
    price?: number;
    quantity?: number;
    threshold?: number;
  }

  export interface Item extends NewItem {
    id: number;
  }

  module GetItems {
    export interface Params {
      selectCondition?: string;
    }
    export interface Callback {
      (err?: Error, res?: {items: Item[]}): void;
    }
  }
  module GetItemInformations {
    export interface Params {
      id: number;
    }
    export interface Callback {
      (err?: Error, res?: {item: Item}): void;
    }
  }
  module GetItemsBelowThreshold {
    export interface Params {}
    export interface Callback {
      (err?: Error, res?: {items: Item[]}): void;
    }
  }
  module DeleteItem {
    export interface Params {
      id: number;
    }
    export interface Callback {
      (err?: Error): void;
    }
  }
  module AddItem {
    export interface Params extends NewItem {}
    export interface Callback {
      (err?: Error, res?: {id: number}): void;
    }
  }
  module UpdateItem {
    export interface Params extends Item {
      id: number;
    }
    export interface Callback {
      (err?: Error): void;
    }
  }
}

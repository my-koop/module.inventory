class Item implements mkinventory.Item {
  public static COLUMNS_DB = ["id", "name", "price", "code"];
  public id              : number;
  public name            : string;
  public price           : number;
  public code            : number;

  constructor(row: any) {
    this.id     = Number(row.id);
    this.name   = row.name;
    this.price  = Number(row.price) || 0.00;
    this.code   = Number(row.code) || 0;
  }
}

export = Item;

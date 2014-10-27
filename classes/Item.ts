class Item {
  public static COLUMNS_DB = ["id", "name", "price", "code"];
  public id              : number;
  public name            : string;
  public price           : number;
  public code            : string;

  constructor(row: any) {
    this.id     = Number(row["id"]);
    this.name   = row["name"];
    this.price  = Number(row["price"]);
    this.code   = row["code"]; 
  }
}

export = Item;
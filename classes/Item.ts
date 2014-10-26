class Item {
  public static COLUMNS_DB = ["id", "name", "price", "code"];
  public id              : number;
  public name            : string;
  public price           : number;
  public code            : string;

  constructor(row: any) {
    this.id     = parseInt(row["id"]);
    this.name   = row["name"];
    this.price  = parseInt(row["price"]) || 0.00;
    this.code   = row["code"]; 
  }
}

export = Item;
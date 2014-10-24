class ItemAdmin {
  public static COLUMNS_ADMIN = ["id", "name", "quantityStock", "quantityReserved", "code"];
  public static COLUMNS_PUBLIC = ["id", "name", "quantityAvailable","code"];
  public id              : number;
  public name            : string;
  public quantityStock   : number;
  public quantityReserved: number;
  public code            : string;

  constructor(row: any) {
    this.id               = parseInt(row["id"]);
    this.name             = row["name"];
    this.quantityStock    = parseInt(row["quantityStock"]);
    this.quantityReserved = parseInt(row["quantityReserved"]);
    this.code             = row["code"];    
  }
}

export = ItemAdmin;
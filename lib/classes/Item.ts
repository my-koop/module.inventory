class Item implements mkinventory.Item {
  public static COLUMNS_DB = [
    "id",
    "code",
    "name",
    "section",
    "description",
    "price",
    "quantity",
    "threshold"
  ];
  public id         : number;
  public code       : string;
  public name       : string;
  public section    : string;
  public description: string;
  public price      : number;
  public quantity   : number;
  public threshold  : number;

  constructor(row) {
    this.id     = Number(row.id);
    this.code   = row.code;
    this.name   = row.name;
    this.section = row.section;
    this.description = row.description;
    this.price  = +row.price || 0;
    this.quantity = +row.quantity || 0;
    this.threshold = +row.threshold || 0;
  }
}

export = Item;

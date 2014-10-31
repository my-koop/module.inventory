//TODO AbstractItem
import Item = require("./Item");
class ItemAdmin extends Item implements mkinventory.ItemAdmin {
  public static COLUMNS_ADMIN = Item.COLUMNS_DB.concat(["quantityStock", "quantityReserved"]);

  //Fix me : To be moved when ItemPublic is created
  public static COLUMNS_PUBLIC = ["quantityAvailable"];

  public quantityStock   : number;
  public quantityReserved: number;

  constructor(row: any) {
    super(row);
    this.quantityStock    = parseInt(row["quantityStock"]) || 0;
    this.quantityReserved = parseInt(row["quantityReserved"]) || 0;
  }
}

export = ItemAdmin;

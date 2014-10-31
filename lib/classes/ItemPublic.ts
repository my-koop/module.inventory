import Item = require("./Item");

class ItemPublic extends Item implements mkinventory.ItemPublic {
  public static COLUMNS_PUBLIC = Item.COLUMNS_DB.concat(["quantityAvailable"]);

  public quantityAvailable   : number;

  constructor(row: any) {
    super(row);
    this.quantityAvailable = parseInt(row.quantityAvailable) || 0;
  }
}

export = ItemPublic;

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//TODO AbstractItem
var Item = require("./Item");
var ItemAdmin = (function (_super) {
    __extends(ItemAdmin, _super);
    function ItemAdmin(row) {
        _super.call(this, row);
        this.quantityStock = parseInt(row["quantityStock"]) || 0;
        this.quantityReserved = parseInt(row["quantityReserved"]) || 0;
    }
    ItemAdmin.COLUMNS_ADMIN = Item.COLUMNS_DB.concat(["quantityStock", "quantityReserved"]);

    ItemAdmin.COLUMNS_PUBLIC = ["quantityAvailable"];
    return ItemAdmin;
})(Item);

module.exports = ItemAdmin;

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Item = require("./Item");

var ItemPublic = (function (_super) {
    __extends(ItemPublic, _super);
    function ItemPublic(row) {
        _super.call(this, row);
        this.quantityAvailable = parseInt(row["quantityAvailable"]) || 0;
    }
    ItemPublic.COLUMNS_PUBLIC = Item.COLUMNS_DB.concat(["quantityAvailable"]);
    return ItemPublic;
})(Item);

module.exports = ItemPublic;

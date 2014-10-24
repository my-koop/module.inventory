var Item = (function () {
    function Item(row) {
        this.id = parseInt(row["id"]);
        this.name = row["name"];
        this.quantityStock = parseInt(row["quantityStock"]);
        this.quantityReserved = parseInt(row["quantityReserved"]);
        this.code = row["code"];
    }
    Item.COLUMNS_ADMIN = ["id", "name", "quantityStock", "quantityReserved", "code"];
    Item.COLUMNS_PUBLIC = ["id", "name", "quantityAvailable", "code"];
    return Item;
})();

module.exports = Item;

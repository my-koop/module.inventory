var Item = (function () {
    function Item(row) {
        this.id = Number(row["id"]);
        this.name = row["name"];
        this.price = Number(row["price"]) || 0.00;
        this.code = Number(row["code"]) || 0;
    }
    Item.COLUMNS_DB = ["id", "name", "price", "code"];
    return Item;
})();

module.exports = Item;

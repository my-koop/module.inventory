var Item = (function () {
    function Item(row) {
        this.id = parseInt(row["id"]);
        this.name = row["name"];
        this.price = parseInt(row["price"]) || 0.00;
        this.code = row["code"];
    }
    Item.COLUMNS_DB = ["id", "name", "price", "code"];
    return Item;
})();

module.exports = Item;

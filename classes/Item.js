var Item = (function () {
    function Item(row) {
        this.id = Number(row["id"]);
        this.name = row["name"];
        this.price = Number(row["price"]);
        this.code = row["code"];
    }
    Item.COLUMNS_DB = ["id", "name", "price", "code"];
    return Item;
})();

module.exports = Item;

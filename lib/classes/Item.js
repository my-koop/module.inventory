var Item = (function () {
    function Item(row) {
        this.id = Number(row.id);
        this.code = row.code;
        this.name = row.name;
        this.section = row.section;
        this.description = row.description;
        this.price = +row.price || 0;
        this.quantity = +row.quantity || 0;
        this.threshold = +row.threshold || 0;
    }
    Item.COLUMNS_DB = [
        "id",
        "code",
        "name",
        "section",
        "description",
        "price",
        "quantity",
        "threshold"
    ];
    return Item;
})();
module.exports = Item;

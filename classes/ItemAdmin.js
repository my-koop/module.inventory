var ItemAdmin = (function () {
    function ItemAdmin(row) {
        this.id = parseInt(row["id"]);
        this.name = row["name"];
        this.quantityStock = parseInt(row["quantityStock"]);
        this.quantityReserved = parseInt(row["quantityReserved"]);
        this.code = row["code"];
    }
    ItemAdmin.COLUMNS_ADMIN = ["id", "name", "quantityStock", "quantityReserved", "code"];
    ItemAdmin.COLUMNS_PUBLIC = ["id", "name", "quantityAvailable", "code"];
    return ItemAdmin;
})();

module.exports = ItemAdmin;

var Item = (function () {
    function Item(id, code, quantityStock, name) {
        this.id = id;
        this.code = code;
        this.quantityStock = quantityStock;
        this.name = name;
    }
    return Item;
})();

module.exports = Item;

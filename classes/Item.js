var Item = (function () {
    function Item(id, code, quantity, name) {
        this.id = id;
        this.code = code;
        this.quantity = quantity;
        this.name = name;
    }
    return Item;
})();
module.exports = Item;

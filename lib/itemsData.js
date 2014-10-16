var Item = require("../classes/Item");
function ItemsData(db, req, res) {
    var items = [];
    if (db) {
        db.getConnection(function (err, connection) {
            connection.query('SELECT * FROM item_list', function (err, rows) {
                if (err)
                    throw err;
                for (var i in rows) {
                    var currItem = rows[i];
                    items.push(new Item(currItem['id'], currItem['code'], currItem['quantityStock'], currItem['code']));
                }
                res.json(items);
            });
        });
    }
}
;
module.exports = ItemsData;

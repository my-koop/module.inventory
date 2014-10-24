var ItemAdmin = require("../classes/ItemAdmin");

function ItemsData(db, req, res) {
    var items = [];
    if (db) {
        db.getConnection(function (err, connection) {
            var query = connection.query('SELECT ?? FROM ??', [ItemAdmin.COLUMNS_ADMIN, 'item_list'], function (err, rows) {
                if (err) {
                    throw err;
                }

                for (var i in rows) {
                    var currItem = rows[i];
                    items.push(new ItemAdmin(currItem));
                }

                res.json(items);
            });
        });
    }
}
;

module.exports = ItemsData;

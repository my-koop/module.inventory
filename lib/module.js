var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controllerList = require("./controllers/index");
var utils = require("mykoop-utils");
var async = require("async");
var getLogger = require("mykoop-logger");
var logger = getLogger(module);
var ItemAdmin = require("./classes/ItemAdmin");

var DatabaseError = utils.errors.DatabaseError;

var InventoryModule = (function (_super) {
    __extends(InventoryModule, _super);
    function InventoryModule() {
        _super.apply(this, arguments);
    }
    InventoryModule.prototype.init = function () {
        var self = this;

        this.db = this.getModuleManager().get("database");
        controllerList.attachControllers(new utils.ModuleControllersBinder(this));
    };

    InventoryModule.prototype.getItemsData = function (callback) {
        var items = [];

        this.db.getConnection(function (err, connection, cleanup) {
            if (err) {
                return callback(new DatabaseError(err));
            }

            var query = connection.query("SELECT ?? FROM ??", [ItemAdmin.COLUMNS_ADMIN, "item_list"], function (err, rows) {
                // We cleanup already because we don't need the connection anymore.
                cleanup();

                if (err) {
                    return callback(new DatabaseError(err));
                }

                for (var i in rows) {
                    var currItem = rows[i];
                    items.push(new ItemAdmin(currItem));
                }

                callback(null, items);
            });
        });
    };

    InventoryModule.prototype.getItemsBelowThresholdData = function (callback) {
        var items = [];

        this.db.getConnection(function (err, connection, cleanup) {
            if (err) {
                return callback(new DatabaseError(err));
            }
            var query = connection.query("SELECT ?? FROM ?? where quantityStock < threshold", [ItemAdmin.COLUMNS_ADMIN, "item_list"], function (err, rows) {
                cleanup();

                if (err) {
                    return callback(new DatabaseError(err));
                }

                for (var i in rows) {
                    var currItem = rows[i];
                    items.push(new ItemAdmin(currItem));
                }

                callback(null, items);
            });
        });
    };

    InventoryModule.prototype.updateItem = function (data, callback) {
        var queryData = {
            name: data.name,
            price: data.price,
            code: data.code,
            threshold: data.threshold
        };
        var id = data.id;
        var inventoryQuery = {
            quantityStock: data.quantityStock
        };
        this.db.getConnection(function (err, connection, cleanup) {
            if (err) {
                return callback(new DatabaseError(err));
            }
            async.waterfall([
                function (callback) {
                    connection.beginTransaction(function (err) {
                        callback(err && new DatabaseError(err));
                    });
                },
                function (callback) {
                    connection.query("UPDATE item SET ? WHERE idItem = ?", [queryData, id], function (err) {
                        callback(err && new DatabaseError(err));
                    });
                },
                function (callback) {
                    connection.query("UPDATE inventory SET ? WHERE idItem = ?", [inventoryQuery, id], function (err) {
                        callback(err && new DatabaseError(err));
                    });
                },
                function (callback) {
                    connection.commit(function (err) {
                        callback(err && new DatabaseError(err));
                    });
                }
            ], function (err) {
                if (err) {
                    connection.rollback(function () {
                        cleanup();
                        callback(err);
                    });
                    return;
                }
                cleanup();

                // TODO:: Return updated item data
                callback(err);
            });
        });
    };

    InventoryModule.prototype.deleteItem = function (id, callback) {
        this.db.getConnection(function (err, connection, cleanup) {
            if (err) {
                return callback(new DatabaseError(err));
            }
            var query = connection.query("DELETE from item WHERE idItem = ?", [id], function (err) {
                // We cleanup already because we don't need the connection anymore.
                cleanup();

                if (err) {
                    return callback(new DatabaseError(err));
                }

                callback();
            });
        });
    };

    InventoryModule.prototype.addItem = function (data, callback) {
        var queryData = {
            name: data.name,
            price: data.price,
            code: data.code,
            threshold: data.threshold
        };
        this.db.getConnection(function (err, connection, cleanup) {
            if (err) {
                return callback(new DatabaseError(err));
            }
            async.waterfall([
                function (callback) {
                    logger.verbose("adding new item", queryData);
                    connection.query("INSERT INTO item SET ?", [queryData], function (err, result) {
                        callback(err && new DatabaseError(err), result ? result.insertId : null);
                    });
                },
                function (id, callback) {
                    var inventoryField = {
                        idItem: id,
                        quantityStock: 0,
                        quantityReserved: 0
                    };
                    connection.query("INSERT INTO inventory SET ?", [inventoryField], function (err) {
                        callback(err && new DatabaseError(err));
                    });
                }
            ], function (err) {
                cleanup();
                callback(err);
            });
        });
    };
    return InventoryModule;
})(utils.BaseModule);

module.exports = InventoryModule;

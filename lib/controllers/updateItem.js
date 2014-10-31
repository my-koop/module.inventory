var getLogger = require("mykoop-logger");
var logger = getLogger(module);

function updateItem(req, res) {
    var self = this;
    var data = {
        id: parseInt(req.param("id")),
        name: req.param("name"),
        code: parseInt(req.param("code")),
        price: parseFloat(req.param("price"))
    };

    self.updateItem(data, function (err) {
        if (err) {
            logger.error(err);
            return res.sendStatus(500);
        }

        res.end();
    });
}
;

module.exports = updateItem;

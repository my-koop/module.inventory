var getLogger = require("mykoop-logger");
var logger = getLogger(module);

function deleteItem(req, res) {
    var idItem = parseInt(req.param("id"));
    logger.verbose(idItem);
    logger.verbose(req.param("id"));
    this.deleteItem(idItem, function (err) {
        if (err) {
            logger.error(err);
            return res.sendStatus(500);
        }

        res.end();
    });
}
;

module.exports = deleteItem;

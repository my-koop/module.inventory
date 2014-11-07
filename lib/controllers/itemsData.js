var utils = require("mykoop-utils");
var logger = utils.getLogger(module);

function getItemsData(req, res) {
    var self = this;
    self.getItemsData(function (err, items) {
        if (err) {
            logger.error(err);
            res.error(err);
            return;
        }

        res.send({
            items: items
        });
    });
}
;

module.exports = getItemsData;

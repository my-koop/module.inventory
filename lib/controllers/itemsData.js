function getItemsData(req, res) {
    var self = this;
    self.getItemsData(function (err, items) {
        if (err) {
            res.send(500);
            return;
        }

        res.send({
            items: items
        });
    });
}
;

module.exports = getItemsData;

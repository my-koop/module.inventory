function getItemsData(req, res) {
    this.getItemsData(function (err, items) {
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

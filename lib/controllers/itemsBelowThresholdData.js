function getItemsBelowThresholdData(req, res) {
    this.getItemsBelowThresholdData(function (err, items) {
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

module.exports = getItemsBelowThresholdData;

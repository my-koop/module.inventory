function updateItem(req, res) {
    this.updateItem(req.body, req.params.id, function (err) {
        if (err) {
            return res.sendStatus(500);
        }

        res.end();
    });
}
;

module.exports = updateItem;

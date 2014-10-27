function updateItem(req, res) {
    this.updateItem(req.body, req.params.id, function (err) {
        if (err) {
            res.send(500);
            return;
        }

        res.send({});
    });
}
;

module.exports = updateItem;

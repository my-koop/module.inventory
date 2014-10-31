function updateItem(req, res) {
    var t = {
        name: req.body.name,
        price: req.body.price
    };

    this.updateItem(t, req.params.id, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.end();
    });
}
;

module.exports = updateItem;

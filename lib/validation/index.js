var _ = require("lodash");

var Validator = require("jsonschema").Validator;
var validator = new Validator();

function validate(obj, schema) {
    var validationResult = validator.validate(obj, { "$ref": schema.id }).errors;
    return _.isEmpty(validationResult) ? null : validationResult.map(function (res) {
        return res.stack;
    });
}

var updateItemSchema = {
    "id": "/UpdateItem",
    "type": "object",
    "properties": {
        "code": { "type": "string", "required": true },
        "name": { "type": "string", "required": true },
        "price": { "type": "number", "required": true }
    }
};
validator.addSchema(updateItemSchema, updateItemSchema.id);

function updateItem(obj) {
    return validate(obj, updateItemSchema);
}
exports.updateItem = updateItem;

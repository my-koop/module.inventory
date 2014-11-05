var validate = require("mykoop-utils/common").validation;

var updateDataConstraint = {
    id: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0
        }
    },
    code: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0
        }
    },
    name: {
        presence: true,
        length: {
            maximum: 45
        }
    },
    price: {
        presence: true,
        numericality: {
            greaterThan: 0
        }
    },
    threshold: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0
        }
    }
};
function updateItem(obj) {
    return validate(obj, updateDataConstraint);
}
exports.updateItem = updateItem;

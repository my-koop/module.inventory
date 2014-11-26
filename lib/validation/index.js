var validate = require("mykoop-utils/common").validation;
var updateDataConstraint = {
    id: {
        numericality: {
            onlyInteger: true,
            message: "^notAnInteger"
        }
    },
    code: {
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            message: "^error"
        }
    },
    name: {
        length: {
            maximum: 45,
            tooLong: "^tooLong__%{count}__"
        }
    },
    section: {
        length: {
            maximum: 45,
            tooLong: "^tooLong__%{count}__"
        }
    },
    description: {},
    price: {
        numericality: {
            greaterThanOrEqualTo: 0,
            message: "^error"
        }
    },
    threshold: {
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0,
            message: "^error"
        }
    },
    quantity: {
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0,
            message: "^error"
        }
    }
};
function itemInformation(obj) {
    return validate(obj, updateDataConstraint);
}
exports.itemInformation = itemInformation;

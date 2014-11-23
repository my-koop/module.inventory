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
      maximum: 45,
    }
  },
  price: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0
    }
  },
  threshold: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0
    }
  },
  quantity: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0
    }
  }
}

export function updateItem(obj) {
  return validate(obj, updateDataConstraint);
}

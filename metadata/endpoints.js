//FIXME: Many of these routes are temporary/as a demo, until a better demo is
// documented or showcased in module.base.
var endpoints = {
    inventory: {
        list: {
            path: "/inventory/list",
            method: "get"
        },
        item: {
            add: {
                path: "/inventory/item",
                method: "post"
            },
            getOne: {
                path: "/inventory/item/:id",
                method: "get"
            },
            getPrice: {
                path: "/inventory/item/:id/price",
                method: "get"
            },
            remove: {
                path: "/inventory/item/:id",
                method: "delete"
            }
        },
        something: {
            path: "/inventory/:a/something/:b/:c/else/:d",
            method: "get"
        }
    }
};

module.exports = endpoints;

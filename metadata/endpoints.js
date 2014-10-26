//FIXME: Many of these routes are temporary/as a demo, until a better demo is
// documented or showcased in module.base.
var endpoints = {
    inventory: {
        list: {
            path: "/inventory/list",
            method: "get"
        },
        item: {
            update: {
                path: "/inventory/item/:id",
                method: "put"
            },
            add: {
                path: "/inventory/item",
                method: "post"
            },
            get: {
                path: "/inventory/item/:id",
                method: "get"
            },
            remove: {
                path: "/inventory/item/:id",
                method: "delete"
            }
        }
    }
};

module.exports = endpoints;

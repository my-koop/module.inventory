var endpoints = {
    inventory: {
        list: {
            path: "/inventory/items",
            method: "get"
        },
        listbelowthreshold: {
            path: "/inventory/listbelowthreshold",
            method: "get"
        },
        item: {
            update: {
                path: "/inventory/items/:id",
                method: "put",
                validation: {
                    resolve: "validation",
                    value: "updateItem"
                }
            },
            add: {
                path: "/inventory/items",
                method: "post"
            },
            remove: {
                path: "/inventory/items/:id",
                method: "delete"
            }
        }
    }
};
module.exports = endpoints;

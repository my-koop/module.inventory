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
        add: {
            path: "/inventory/items",
            method: "post",
            validation: {
                resolve: "validation",
                value: "itemInformation"
            }
        },
        item: {
            get: {
                path: "/inventory/items/:id",
                method: "get",
            },
            update: {
                path: "/inventory/items/:id",
                method: "put",
                validation: {
                    resolve: "validation",
                    value: "itemInformation"
                }
            },
            remove: {
                path: "/inventory/items/:id",
                method: "delete"
            }
        }
    }
};
module.exports = endpoints;

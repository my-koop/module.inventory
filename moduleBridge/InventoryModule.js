var path = require("path");

var InventoryModule = (function () {
    function InventoryModule() {
    }
    InventoryModule.prototype.init = function (moduleManager) {
        this.moduleManager = moduleManager;

        //var db = <mkdatabase.Module>this.moduleManager.get("database");
        var routerModule = this.moduleManager.get("router");
        routerModule.addRoutes(function (router) {
            //router.get("/items",itemsData.bind(null,db));
            router.get("/itemlist", function (req, res) {
                //FIXME: I imagine router will expose a clean way to do this...
                res.sendFile(path.join(__dirname, "../../service.website/public/index.html"));
            });
            return "/inventory";
        });
        /*
        if(db){
        this.db = db;
        }
        */
    };

    InventoryModule.prototype.get = function () {
        return "trollolol";
    };
    return InventoryModule;
})();

module.exports = InventoryModule;

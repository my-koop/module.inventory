var React = require("react/addons");
var MKItems = require("./Items");
var __ = require("language").__;
var BSButton = require("react-bootstrap/Button");
var reactRouter = require("react-router");
var routeData = require("dynamic-metadata").routes;

var ItemsPage = React.createClass({
  goToNewItemPage: function() {
    reactRouter.transitionTo(routeData.dashboard.children.inventory.children.createItem);
  },

  render: function() {
    return (
      <header>
        {__("inventory::inventoryWelcome")}
      </header>
      <div>
        <BSButton
          onClick={this.goToNewItemPage}
          bsStyle="success"
        >
          {__("inventory::newItem")}
        </BSButton>
      </div>
      <div>
        <MKItems />
      </div>
    );
  }
});

module.exports = ItemsPage;

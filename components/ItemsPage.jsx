var React = require("react/addons");
var MKItems = require("./Items");
var __ = require("language").__;
var BSButton = require("react-bootstrap/Button");
var reactRouter = require("react-router");
var routeData = require("dynamic-metadata").routes;

var ItemsPage = React.createClass({
  goToNewItemPage: function() {
    reactRouter.transitionTo(routeData.dashboard.children.inventory.children.createItem.name);
  },

  render: function() {
    return (
      <div>
        <h1>
          {__("inventory::inventoryWelcome")}
        </h1>
        <BSButton
          onClick={this.goToNewItemPage}
          bsStyle="success"
        >
          {__("inventory::newItem")}
        </BSButton>
        <MKItems />
      </div>
    );
  }
});

module.exports = ItemsPage;

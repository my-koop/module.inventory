var React = require("react/addons");
var Router = require("react-router");
var BSButton = require("react-bootstrap/Button");

var MKItems = require("./Items");
var MKIcon = require("mykoop-core/components/Icon");

var getRouteName = require("mykoop-utils/frontend/getRouteName");
var __ = require("language").__;

var ItemsPage = React.createClass({
  goToNewItemPage: function() {
    Router.transitionTo("createItemPage");
  },

  render: function() {
    return (
      <div>
        <h1 className="pull-left">
          {__("inventory::inventoryWelcome")}
        </h1>
        <h1 className="pull-right">
          <BSButton
            onClick={this.goToNewItemPage}
            bsStyle="success"
          >
            <span>
              <MKIcon glyph="plus" fixedWidth/>
              {__("inventory::newItem")}
            </span>
          </BSButton>
        </h1>
        <MKItems />
      </div>
    );
  }
});

module.exports = ItemsPage;

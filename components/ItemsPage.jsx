var React = require("react/addons");
var Router = require("react-router");
var BSButton = require("react-bootstrap/Button");

var MKItems = require("./Items");
var MKIcon = require("mykoop-core/components/Icon");
var MKPermissionMixin = require("mykoop-user/components/PermissionMixin")

var getRouteName = require("mykoop-utils/frontend/getRouteName");
var __ = require("language").__;

var ItemsPage = React.createClass({
  mixins: [MKPermissionMixin],

  goToNewItemPage: function() {
    Router.transitionTo("createItemPage");
  },

  render: function() {
    var canCreate = this.constructor.validateUserPermissions({
      inventory: {create: true}
    });

    return (
      <div>
        <h1 className="pull-left">
          {__("inventory::inventoryWelcome")}
        </h1>
        {canCreate ?
        <span className="pull-right h1">
          <BSButton
            onClick={this.goToNewItemPage}
            bsStyle="success"
          >
            <span>
              <MKIcon glyph="plus" fixedWidth/>
              {__("inventory::newItem")}
            </span>
          </BSButton>
        </span>
        : null}
        <MKItems />
      </div>
    );
  }
});

module.exports = ItemsPage;

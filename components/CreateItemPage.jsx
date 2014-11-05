var React = require("react/addons");
var BSButton = require("react-bootstrap/Button");
var BSButtonGroup = require("react-bootstrap/ButtonGroup");
var BSCol = require("react-bootstrap/Col");
var BSAlert = require("react-bootstrap/Alert");
var BSModal = require("react-bootstrap/Modal");

var reactRouter = require("react-router");
var routeData = require("dynamic-metadata").routes;

var actions  = require("actions");
var __ = require("language").__;

var MKItemEditForm = require("./ItemEditForm");

var CreateItemPage = React.createClass({

  getInitialState: function() {
    return {
      item: {},
      errorMessage: null,
      success: null
    }
  },

  onContinue: function() {
    return this.setState({
      errorMessage: null,
      success: null
    });
  },

  onFinish: function() {
    reactRouter.transitionTo(
      routeData.dashboard.children.inventory.children.items.name
    );
  },

  onSave: function() {
    var self = this;
    var item = this.refs.itemForm.getItem();
    this.setState({
      item: item
    });

    actions.inventory.item.add({
      data: item
    }, function(err, body) {
      if(err) {
        console.error(err);
        return self.setState({
          errorMessage: __("inventory::item_new", {context:"failed"}),
          success: false
        });
      }
      return self.setState({
        errorMessage: null,
        success: __("inventory::item_new", {context:"success"})
      });
    });
  },

  render: function() {
    var body;
    if(this.state.success) {
      body = (
        <div>
          <BSAlert bsStyle="success">
            {this.state.success}
          </BSAlert>
          <div className="pull-right">
            <BSButton
              onClick={this.onContinue}
              bsStyle="success"
            >
              {__("continue")}
            </BSButton>
            <BSButton
              onClick={this.onFinish}
              bsStyle="danger"
            >
              {__("finish")}
            </BSButton>
          </div>
        </div>
      );
    } else {
      body = (
        <div>
          {this.state.errorMessage ?
            <BSAlert bsStyle="danger">
              {this.state.errorMessage}
            </BSAlert>
          : null}
          <MKItemEditForm item={this.state.item} ref="itemForm" />
          <BSButton
            onClick={this.onSave}
            className="pull-right"
            bsStyle="success"
          >
            {__("save")}
          </BSButton>
        </div>
      );
    }

    return (
      <div>
        <h1>
          {__("inventory::createItemWelcome")}
        </h1>
        <BSCol md={4}>
          {body}
        </BSCol>
      </div>
    );
  }
});

module.exports = CreateItemPage;

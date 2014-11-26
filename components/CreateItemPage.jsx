var React = require("react/addons");
var Router = require("react-router");

var BSButton = require("react-bootstrap/Button");
var BSCol = require("react-bootstrap/Col");

var actions  = require("actions");
var __ = require("language").__;

var MKItemEditForm = require("./ItemEditForm");
var MKFeedbacki18nMixin = require("mykoop-core/components/Feedbacki18nMixin");

var CreateItemPage = React.createClass({
  mixins: [MKFeedbacki18nMixin],

  getInitialState: function() {
    return {
      item: {},
      success: null
    }
  },

  onContinue: function() {
    this.clearFeedback();
    return this.setState({
      success: null
    });
  },

  onFinish: function() {
    Router.transitionTo("items");
  },

  onSave: function() {
    var self = this;
    var item = this.refs.itemForm.getItem();
    this.setState({
      item: item
    });

    this.clearFeedback();
    actions.inventory.add({
      i18nErrors: {
        prefix: "inventory::errors",
        keys: ["app"]
      },
      data: item
    }, function(err, body) {
      if(err) {
        return self.setFeedback(err.i18n, "danger");
      }
      self.setFeedback({key:"inventory::item_new_success"}, "success");
      self.setState({
        success: true
      });
    });
  },

  render: function() {
    var body;
    if(this.state.success) {
      body = (
        <div>
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
          {this.renderFeedback()}
          {body}
        </BSCol>
      </div>
    );
  }
});

module.exports = CreateItemPage;

var React = require("react/addons");
var Router = require("react-router");

var BSButton = require("react-bootstrap/Button");
var BSCol = require("react-bootstrap/Col");

var actions  = require("actions");
var __ = require("language").__;

var MKFeedbacki18nMixin = require("mykoop-core/components/Feedbacki18nMixin");
var MKAlertTrigger = require("mykoop-core/components/AlertTrigger");
var MKItemEditForm = require("./ItemEditForm");

var EditItemPage = React.createClass({
  mixins: [MKFeedbacki18nMixin],

  propTypes: {
    params: React.PropTypes.shape({
      id: React.PropTypes.string
    })
  },

  getDefaultState: function() {
    return {
      params: {
        id: -1
      }
    };
  },

  getInitialState: function() {
    return {
      item: {},
    }
  },

  componentWillMount: function () {
    var self = this;
    actions.inventory.item.get({
      i18nErrors: {
        prefix: "inventory::errors",
        keys: ["app"]
      },
      data: {
        id: this.props.params.id
      }
    }, function(err, res) {
      if(err) {
        return self.setFeedback(err.i18n, "danger");
      }
      self.setState({
        item: res.item
      });
    });
  },

  onUpdateItem: function() {
    var self = this;
    this.clearFeedback();
    var item = this.refs.itemForm.getItem();
    this.setState({
      item: item
    });

    actions.inventory.item.update({
      i18nErrors: {
        prefix: "inventory::errors",
        keys: ["app"]
      },
      data: _.merge(item, {id: this.props.params.id})
    }, function(err, body) {
      if(err) {
        return self.setFeedback(err.i18n, "danger");
      }
      MKAlertTrigger.showAlert(__("success"));
      // Go to items list
      Router.transitionTo("items");
    });
  },

  render: function() {
    return (
      <div>
        <h1>
          {__("inventory::editItemWelcome") + " #" + this.props.params.id}
        </h1>
        <BSCol md={4}>
          {this.renderFeedback()}
          <MKItemEditForm item={this.state.item} ref="itemForm" />
          <BSButton
            onClick={this.onUpdateItem}
            bsStyle="success"
          >
            {__("update")}
          </BSButton>
        </BSCol>
      </div>
    );
  }
});

module.exports = EditItemPage;

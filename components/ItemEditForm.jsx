var React    = require("react/addons");
var BSInput  = require("react-bootstrap/Input");
var BSAlert  = require("react-bootstrap/Alert");

var actions  = require("actions");
var _  = require("lodash");
var __ = require("language").__;

var ItemEditForm = React.createClass({
  // Decided for a one layer linkedState, because much simpler and faster
  // than custom linking and more reliable
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    item: React.PropTypes.shape({
      code: React.PropTypes.number,
      name: React.PropTypes.string,
      price: React.PropTypes.number,
      threshold: React.PropTypes.number
    }).isRequired
  },

  getItem: function() {
    return {
      name: this.state.name,
      code: parseInt(this.state.code),
      price: parseFloat(this.state.price),
      threshold: parseInt(this.state.threshold),
    }
  },

  getInitialState: function() {
    // making a copy of item props because keeping this.props.item
    // was keeping a pointer to item, therefore modifying it when modifying
    // the state
    return {
      name: this.props.item.name,
      code: this.props.item.code,
      price: this.props.item.price,
      threshold: this.props.item.threshold,
    }
  },

  render: function () {
    var others = _.omit(this.props, 'item');
    return (
      <div {...others} >
        <BSInput
          type="number"
          label={__("inventory::code")}
          valueLink={this.linkState("code")}
        />
        <BSInput
          type="text"
          label={__("inventory::itemname")}
          valueLink={this.linkState("name")}
        />
        <BSInput
          type="number"
          label={__("inventory::price")}
          valueLink={this.linkState("price")}
        />
        <BSInput
          type="number"
          label={__("inventory::threshold")}
          valueLink={this.linkState("threshold")}
        />
      </div>
    );
  }
});

module.exports = ItemEditForm;

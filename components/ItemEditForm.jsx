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
      code: React.PropTypes.string,
      section: React.PropTypes.string,
      description: React.PropTypes.string,
      name: React.PropTypes.string,
      price: React.PropTypes.number,
      quantity: React.PropTypes.number,
      threshold: React.PropTypes.number
    }).isRequired
  },

  getItem: function() {
    return {
      name: this.state.name,
      code: this.state.code,
      section: this.state.section,
      description: this.state.description,
      price: parseFloat(this.state.price),
      quantity: parseInt(this.state.quantity),
      threshold: parseInt(this.state.threshold),
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState(this.updateItem(nextProps));
  },

  getInitialState: function() {
    // making a copy of item props because keeping this.props.item
    // was keeping a pointer to item, therefore modifying it when modifying
    // the state
    return this.updateItem(this.props);
  },

  updateItem: function(props) {
    return {
      name: props.item.name,
      section: props.item.section,
      description: props.item.description,
      code: props.item.code,
      price: props.item.price,
      quantity: props.item.quantity,
      threshold: props.item.threshold,
    }
  },

  render: function () {
    var others = _.omit(this.props, "item");
    return (
      <div {...others} >
        <BSInput
          type="text"
          label={__("inventory::code")}
          valueLink={this.linkState("code")}
        />
        <BSInput
          type="text"
          label={__("inventory::section")}
          valueLink={this.linkState("section")}
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
          label={__("inventory::quantity")}
          valueLink={this.linkState("quantity")}
        />
        <BSInput
          type="number"
          label={__("inventory::threshold")}
          valueLink={this.linkState("threshold")}
        />
        <BSInput
          type="textarea"
          label={__("inventory::description")}
          valueLink={this.linkState("description")}
        />
      </div>
    );
  }
});

module.exports = ItemEditForm;

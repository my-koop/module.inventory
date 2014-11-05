var React    = require("react/addons");
var BSButton = require("react-bootstrap/Button");
var BSModal  = require("react-bootstrap/Modal");
var BSInput  = require("react-bootstrap/Input");
var BSAlert  = require("react-bootstrap/Alert");

var actions     = require("actions");
var __          = require("language").__;

//TODO AbstractModal
var ItemEditModal = React.createClass({
  // Decided for a one layer linkedState, because much simpler and faster
  // than custom linking and more reliable
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      code: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.number.isRequired,
      threshold: React.PropTypes.number.isRequired
    }).isRequired
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
      errorMessage: null
    }
  },

  onSave: function (hideFnc) {
    var self = this;
    actions.inventory.item.update({
      data: {
        id: self.props.item.id,
        name: self.state.name,
        code: parseInt(self.state.code),
        price: parseFloat(self.state.price),
        threshold: parseInt(self.state.threshold)
      }
    }, function (err, res) {
      if (err) {
        console.error(err);
        self.setState({
          errorMessage: __("inventory::item_update", {context:"failed"})
        });
        return;
      }
      // TODO:: Give feedback to user after successful update and refresh table
      // with new content
      self.setState({errorMessage: null});
      hideFnc();
    });
  },

  render: function () {
    var item = this.props.item;
    var self = this;
    return this.transferPropsTo(
      <BSModal
        title={__("inventory::editing") + " " + item.name}
        bsSize="small"
        backdrop="static"
      >
        <div className="modal-body">
          {this.state.errorMessage ?
            <BSAlert bsStyle="danger">
              {this.state.errorMessage}
            </BSAlert>
          : null}
          <BSInput
            type="number"
            label={__("inventory::code")}
            valueLink={self.linkState("code")}
          />
          <BSInput
            type="text"
            label={__("inventory::itemname")}
            valueLink={self.linkState("name")}
          />
          <BSInput
            type="number"
            label={__("inventory::price")}
            valueLink={self.linkState("price")}
          />
          <BSInput
            type="number"
            label={__("inventory::threshold")}
            valueLink={self.linkState("threshold")}
          />
        </div>
        <div className="modal-footer">
          <BSButton
            onClick={self.onSave.bind(self, this.props.onRequestHide)}
          >
            {__("save")}
          </BSButton>
          <BSButton
            type="close"
            onClick={this.props.onRequestHide}
          >
            {__("cancel")}
          </BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = ItemEditModal;

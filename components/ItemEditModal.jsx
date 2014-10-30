var React    = require("react");
var BSButton = require("react-bootstrap/Button");
var BSModal  = require("react-bootstrap/Modal");
var BSInput  = require("react-bootstrap/Input");
var BSAlert  = require("react-bootstrap/Alert");

var actions  = require("actions");
var __ = require("language").__;

//TODO AbstractModal
var ItemEditModal = React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.number.isRequired
    }).isRequired
  },

  getInitialState: function() {
    return {
      item: this.props.item,
      errorMessage: null
    }
  },

  onSave: function (closeFnc) {
    var self = this;
    actions.inventory.item.update({
      data: {
        id: self.state.item.id,
        name: self.state.item.name,
        price: parseFloat(self.state.item.price)
      }
    }, function (err, res) {
      if (err) {
        console.error(err);
        self.setState({
          errorMessage: __("inventory::item_update", {context:"failed"})
        });
        return;
      }
      self.setState({errorMessage: null});
      closeFnc();
      //TODO close the modal. halp. I'm not sure how
    });
  },

  handleFieldChange: function(field, newValue) {
    var item = this.state.item;
    item[field] = newValue;
    this.setState({item: item});
  },

  makeValueLink: function(field) {
    return {
      value: this.state.item[field],
      requestChange: this.handleFieldChange.bind(this, field)
    }
  },

  hideModal: function() {
    this.refs.modal.hide();
  },

  render: function () {
    var item = this.props.item;
    var self = this;
    return this.transferPropsTo (
      <BSModal title={"Editing " + item.name} bsSize="small" backdrop="static">
        <div className="modal-body">
          {this.state.errorMessage ?
            <BSAlert bsStyle="warning">
              {this.state.errorMessage}
            </BSAlert>
          : null}
          <BSInput
            type="static"
            label="ID"
            placeholder="ID"
            value={item.id}
          />
          <BSInput
            type="text"
            label="Item Name (EN)"
            placeholder="Name"
            valueLink={self.makeValueLink("name")}
          />
          <BSInput
            type="text"
            label="Price"
            placeholder="Price"
            valueLink={self.makeValueLink("price")}
          />
        </div>
        <div className="modal-footer">
          <BSButton onClick={self.onSave.bind(self, this.props.onRequestHide)}>Save and close</BSButton>
          <BSButton type="close" onClick={this.props.onRequestHide} >Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = ItemEditModal;

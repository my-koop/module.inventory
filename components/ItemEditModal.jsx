var React    = require("react");
var BSButton = require("react-bootstrap/Button");
var BSModal  = require("react-bootstrap/Modal");
var BSInput  = require("react-bootstrap/Input");
var MKModal  = require("components/AbstractModal");
//var MKModal  = require("mykoop-core/components/AbstractModal");
var actions  = require("actions");

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
      item: this.props.item
    }
  },

  onSave: function (itemId, closeFnc) {
    console.log(this.refs.name.getValue());

    actions.inventory.item.update({
      query: {
        id: itemId
      },
      data: {
        name: this.refs.name.getValue(),
        price: parseFloat(this.refs.price.getValue())
      }
    }, function (err, res) {
      if (err) {
        console.error("Update failed:", err);
        return;
      }
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

  render: function () {
    var item = this.props.item;
    var self = this;
    return (<MKModal
      title={"Editing " + item.name}
      backdrop="static"
      modalBody={
        <div>
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
      }
      footer={
        <BSButton onClick={self.onSave.bind(null, item.id, this.props.onRequestHide)}>Save and close</BSButton>
      }
    >
    </MKModal>);
  }
});

module.exports = ItemEditModal;

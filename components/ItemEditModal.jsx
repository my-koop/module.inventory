var React = require("react");
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");
var BSInput= require("react-bootstrap/Input");
var actions           = require("actions");

//TODO AbstractModal
var ItemEditModal = React.createClass({
  onSave: function (itemId) {
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

      console.log("Updated!", res.body);
    });
  },

  render: function () {
    var item = this.props.item;
    return this.transferPropsTo(
      <BSModal title={"Editing item " + item.name} backdrop="static">
        <div className="modal-body" >
          <BSInput type="static" label="ID" placeholder="ID" value={item.id} />
          <BSInput type="text" label="Item Name (EN)" placeholder="Name" defaultValue={item.name} ref="name" />
          <BSInput type="text" label="Price" placeholder="Price" ref="price" />
        </div>
        <div className="modal-footer">
          <BSButton onClick={this.onSave.bind(null, item.id)}>Save</BSButton>
          <BSButton onClick={this.props.onRequestHide}>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = ItemEditModal;

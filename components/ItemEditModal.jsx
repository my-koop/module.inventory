var React = require("react");
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");
var BSInput= require("react-bootstrap/Input");

//TODO AbstractModal
var ItemEditModal = React.createClass({

  render: function () {

    var item = this.props.item;
    return this.transferPropsTo(
      <BSModal title={"Editing item " + item.name} backdrop="static">
        <div className="modal-body" >
          <BSInput type="static" label="ID" placeholder="ID" value={item.id} />
          <BSInput type="text" label="Item Name (EN)" placeholder="Name" defaultValue={item.name} />
          <BSInput type="text" label="Price" placeholder="Price" />
        </div>
        <div className="modal-footer">
          <BSButton onClick={this.props.onRequestHide}>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = ItemEditModal;

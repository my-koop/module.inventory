var React    = require("react/addons");
var BSButton = require("react-bootstrap/Button");
var BSModal  = require("react-bootstrap/Modal");
var BSInput  = require("react-bootstrap/Input");
var BSAlert  = require("react-bootstrap/Alert");

var actions  = require("actions");
var __ = require("language").__;
var _  = require("lodash");

var MKItemEditForm = require("./ItemEditForm");

//TODO AbstractModal
var ItemEditModal = React.createClass({
  // Decided for a one layer linkedState, because much simpler and faster
  // than custom linking and more reliable
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
    }).isRequired
  },

  getInitialState: function() {
    return {
      errorMessage: null
    }
  },

  onSave: function (hideFnc) {
    var self = this;
    var data = _.merge(this.refs.itemForm.getItem(), {id: this.props.item.id});
    actions.inventory.item.update({
      data: data
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
    var item = _.omit(this.props.item, 'id');
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
          <MKItemEditForm item={item} ref="itemForm" />
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

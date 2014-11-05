var React             = require("react");
var BSCol             = require("react-bootstrap/Col");
var BSButton          = require("react-bootstrap/Button");
var BSModalTrigger    = require("react-bootstrap/ModalTrigger");
var MKIcon            = require("mykoop-core/components/Icon");
var MKTableSorter     = require("mykoop-core/components/TableSorter");
var MKListModButtons  = require("mykoop-core/components/ListModButtons");
var MKItemEditModal   = require("./ItemEditModal");
var __                = require("language").__;
var actions           = require("actions");

var Items = React.createClass({
  getInitialState: function() {
    return {
      items: []
    }
  },

  componentWillMount: function() {
    var self = this;

    actions.inventory.listbelowthreshold(function (err, res) {
      if (err) {
        console.error(err);
        return;
      }

      self.setState({items: res.items});
    });
  },


  render: function() {
    var self = this;

    // TableSorter Config
    var CONFIG = {
      columns: {
        id: {
          name: __("inventory::id"),
        },
        name: {
          name: __("inventory::name"),
        },
        quantityStock: {
          name: __("inventory::quantityStock"),
        },
        threshold: {
          name: __("inventory::threshold"),
        },
        code: {
          name: __("inventory::code"),
        }
      }
    };

    return (
      <BSCol md={12}>
        <div>
          <MKTableSorter
            config={CONFIG}
            items={this.state.items}
            headerRepeat={8}
            striped
            bordered
            condensed
            hover
          />
        </div>
      </BSCol>
    );
  }
});

module.exports = Items;

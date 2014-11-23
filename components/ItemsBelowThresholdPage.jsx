var React             = require("react");
var BSCol             = require("react-bootstrap/Col");
var MKTableSorter     = require("mykoop-core/components/TableSorter");
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
        quantity: {
          name: __("inventory::quantity"),
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

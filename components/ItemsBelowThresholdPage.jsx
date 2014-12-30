var React             = require("react");

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

    actions.inventory.listbelowthreshold({
      i18nErrors: {},
      alertErrors: true
    }, function (err, res) {
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
          name: __("id"),
        },
        name: {
          name: __("name"),
        },
        quantity: {
          name: __("quantity"),
        },
        threshold: {
          name: __("inventory::threshold"),
        },
        code: {
          name: __("code"),
        }
      }
    };

    return (
      <div>
        <h1>
          {__("inventory::itemBelowThresholdTitle")}
        </h1>
        <MKTableSorter
          config={CONFIG}
          items={this.state.items}
          striped
          bordered
          condensed
          hover
        />
      </div>
    );
  }
});

module.exports = Items;

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

    actions.inventory.list(function (err, res) {
      if (err) {
        console.error(err);
        return;
      }

      self.setState({items: res.items});
    });
  },

  actionsGenerator: function(item) {
    return [
      {
        icon: "edit",
        tooltip: {
          text: __("inventory::editItem"),
          overlayProps: {
            placement: "top"
          }
        },
        modalTrigger: <MKItemEditModal item={item} />
      },
      {
        icon: "remove",
        warningMessage: __("general::areYouSure"),
        tooltip: {
          text: __("general::remove"),
          overlayProps: {
            placement: "top"
          }
        },
        callback: function() {
          var id = item.id;
          actions.inventory.item.remove(
          {
            data: {
              id : id
            }
          }, function(err, res){
            if (err) {
              console.error(err);
              return;
            }

            alert(__("inventory::removedItemMessage") + ": " + item.name);
          });
        }
      }
    ];
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
        quantityReserved: {
          name: __("inventory::quantityReserved"),
        },
        code: {
          name: __("inventory::code"),
        },
        actions: {
          name: __("inventory::actions"),
          isStatic: true,
          cellGenerator: function(item) {
            return (
              <MKListModButtons
                defaultTooltipDelay={500}
                buttons={self.actionsGenerator(item)}
              />
            );
          }
        }
      }
    };

    //Fixme : Add default value for headerRepeat in TableSorter
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

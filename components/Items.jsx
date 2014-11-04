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
          text: "Edit Item",
          overlayProps: {
            placement: "top"
          }
        },
        modalTrigger: <MKItemEditModal item={item} />
      },
      {
        icon: "remove",
        warningMessage: "Are you sure?",
        tooltip: {
          text: "Delete",
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

            alert("You deleted the item : " + item.name);
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
          name: "ID",
        },
        name: {
          name: "Name",
        },
        quantityStock: {
          name: "Quantity stock",
        },
        quantityReserved: {
          name: "Quantity reserved",
        },
        code: {
          name: "Code",
        },
        actions: {
          name: "Actions",
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

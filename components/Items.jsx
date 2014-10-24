var React             = require("react");
var BSCol             = require("react-bootstrap/Col");
var BSButton          = require("react-bootstrap/Button");
var BSModalTrigger    = require("react-bootstrap/ModalTrigger");
var MKIcon            = require("components/Icon");
var MKTableSorter     = require("components/TableSorter");
var MKListModButtons  = require("components/ListModButtons");
var MKItemEditModal   = require("./ItemEditModal");
var __                = require("language").__;
var actions           = require("actions");

var Items = React.createClass({
  getInitialState: function(){
    return {
      items: []
    }
  },

  componentWillMount: function() {
    var self = this;

  componentWillMount: function(){
    var self = this;

    actions.inventory.list(function (err, res) {
      if (err) {
        console.error(res.status, err.toString());
        return;
      }

      self.setState({items: res.body.items});
    });
  },

  actionsGenerator: function(item){
    return [
      {
        content: ( <MKIcon glyph="star" library="glyphicon" /> ),
        tooltip: {
          text: __("saveAsFavorite"),
          overlayProps: {
            placement: "left"
          }
        }
      },
      {
        icon: "plus",
        tooltip: {
          text: "Increase quantity",
          overlayProps: {
            placement: "top",
          }
        }
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
        callback: function(){
          alert("You deleted the item, or did you?");
        }
      },
      {
        icon: "edit",
        tooltip: {
          text: "Edit Item",
          overlayProps: {
            placement: "right"
          }
        },
        warningMessage: "You sure?",
        modalTrigger: <MKItemEditModal name={item.name} itemId={item.id}/>
      },
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
          cellGenerator: function(item){
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

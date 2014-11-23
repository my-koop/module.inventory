var React = require("react");

var BSCol          = require("react-bootstrap/Col");
var BSInput        = require("react-bootstrap/Input");

var MKIcon           = require("mykoop-core/components/Icon");
var MKTableSorter    = require("mykoop-core/components/TableSorter");
var MKListModButtons = require("mykoop-core/components/ListModButtons");
var MKAlertTrigger   = require("mykoop-core/components/AlertTrigger");

var __      = require("language").__;
var actions = require("actions");

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

  actionsGenerator: function(item, i) {
    var self = this;
    var buttonDefinitions = [
      {
        icon: "trash",
        warningMessage: __("areYouSure"),
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
            var items = self.state.items;
            items.splice(i, 1);
            self.setState({
              items: items
            });
            MKAlertTrigger.showAlert(
              __("inventory::removedItemMessage") + ": " + item.name
            );
          });
        }
      }
    ];
    if(!item.editing) {
      buttonDefinitions.unshift({
        icon: "edit",
        tooltip: {
          text: __("inventory::editItem"),
          overlayProps: {
            placement: "top"
          }
        },
        callback: function() {
          item.editing = true;
          self.state.items[i] = item;
          self.setState({
            items: self.state.items
          });
        }
      });
    } else {
      buttonDefinitions.unshift({
        icon: "save",
        tooltip: {
          text: __("inventory::saveItem"),
          overlayProps: {
            placement: "top"
          }
        },
        callback: function() {
          actions.inventory.item.update({
            data: item
          }, function (err, res) {
            if (err) {
              console.error(err);
              return;
            }
            item.editing = false;
            self.state.items[i] = item;
            self.setState({
              items: self.state.items
            });
          });
        }
      });
    }

    return buttonDefinitions;
  },

  render: function() {
    var self = this;

    function makeNumberItemInput(field) {
      return function(item, i) {
        if(item.editing) {
          var valueLink = {
            value: item[field],
            requestChange: function(newValue) {
              newValue = parseInt(newValue);
              if(newValue < 0) {
                newValue = 0;
              }
              self.state.items[i][field] = newValue;
              self.setState({
                items: self.state.items
              });
            }
          }
          return <BSInput type="number" valueLink={valueLink} />
        }
        return item[field];
      }
    }

    // TableSorter Config
    var CONFIG = {
      defaultOrdering: [
        "id",
        "code",
        "name",
        "quantity",
        "threshold",
        "actions"
      ],
      columns: {
        id: {
          name: __("inventory::id"),
        },
        name: {
          name: __("name"),
          cellGenerator: function(item, i) {
            if(item.editing) {
              var valueLink = {
                value: item.name,
                requestChange: function(newName) {
                  self.state.items[i].name = newName;
                  self.setState({
                    items: self.state.items
                  });
                }
              }
              return <BSInput type="text" valueLink={valueLink} />
            }
            return item.name;
          }
        },
        quantity: {
          name: __("inventory::quantity"),
          cellGenerator: makeNumberItemInput("quantity")
        },
        code: {
          name: __("inventory::code"),
          cellGenerator: makeNumberItemInput("code")
        },
        threshold: {
          name: __("inventory::threshold"),
          cellGenerator: makeNumberItemInput("threshold")
        },
        actions: {
          name: __("actions"),
          isStatic: true,
          cellGenerator: function(item, i) {
            return (
              <MKListModButtons
                defaultTooltipDelay={500}
                buttons={self.actionsGenerator(item, i)}
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

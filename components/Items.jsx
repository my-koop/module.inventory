var React = require("react");
var Router = require("react-router");

var BSCol   = require("react-bootstrap/Col");
var BSInput = require("react-bootstrap/Input");

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
        MKAlertTrigger.showAlert(__("errors::error", {context: err.context}));
        return;
      }

      self.setState({items: res.items});
    });
  },

  removeItem: function(item, i) {
    var self = this;
    var id = item.id;
    actions.inventory.item.remove(
    {
      i18nErrors: {},
      data: {
        id : id
      }
    }, function(err, res){
      if (err) {
        var i18n = err.i18n[0];
        MKAlertTrigger.showAlert(__(i18n.key, i18n));
        return;
      }
      var items = self.state.items;
      items.splice(i, 1);
      self.setState({
        items: items
      });
      MKAlertTrigger.showAlert(
        __("inventory::removedItemMessage") + ": " + (item.name || item.id)
      );
    });
  },

  saveItem: function(item, i) {
    var self = this;
    actions.inventory.item.update({
      i18nErrors: {
        prefix: "inventory::errors",
        keys: ["app"]
      },
      data: item
    }, function (err, res) {
      if (err) {
        var i18n = err.i18n[0];
        MKAlertTrigger.showAlert(__(i18n.key, i18n));
        return;
      }
      item.editing = false;
      self.state.items[i] = item;
      self.setState({
        items: self.state.items
      });
    });
  },

  actionsGenerator: function(item, i) {
    var self = this;

    if(!item.editing) {
      return [
        // Edit Item
        {
          icon: "edit",
          tooltip: {
            text: __("inventory::quickEditItem"),
            overlayProps: {
              placement: "top"
            }
          },
          callback: function() {
            var backupItem = _.cloneDeep(item);
            item.editing = true;
            item.backup = backupItem;
            self.state.items[i] = item;
            self.setState({
              items: self.state.items
            });
          }
        },
        // Item Details
        {
          icon: "search-plus",
          tooltip: {
            text: __("inventory::editItem"),
            overlayProps: {
              placement: "top"
            }
          },
          callback: function() {
            Router.transitionTo("editItemPage", {id: item.id});
          }
        },
        // Remove Item
        {
          icon: "trash",
          warningMessage: __("areYouSure"),
          tooltip: {
            text: __("remove"),
            overlayProps: {
              placement: "top"
            }
          },
          callback: _.bind(self.removeItem, self, item, i)
        }
      ];
    } else {
      return [
        // Save Item
        {
          icon: "save",
          tooltip: {
            text: __("inventory::saveItem"),
            overlayProps: {
              placement: "top"
            }
          },
          callback: _.bind(self.saveItem, self, item, i)
        },
        // Cancel modifications
        {
          icon: "close",
          tooltip: {
            text: __("cancel"),
            overlayProps: {
              placement: "top"
            }
          },
          callback: function() {
            item = item.backup;
            self.state.items[i] = item;
            self.setState({
              items: self.state.items
            });
          }
        }
      ];
    }
  },

  render: function() {
    var self = this;

    function makeEditableField(field, type, parseFunc) {
      return function(item, i) {
        if(item.editing) {
          var valueLink = {
            value: item[field],
            requestChange: function(newValue) {
              self.state.items[i][field] = parseFunc(newValue);
              self.setState({
                items: self.state.items
              });
            }
          }
          return <BSInput type={type} valueLink={valueLink} />
        }
        return item[field];
      }
    }
    function makeTextItemInput(field) {
      return makeEditableField(field, "text", _.identity);
    }
    function makeNumberItemInput(field, min, max) {
      return makeEditableField(field, "number", function(value) {
        value = parseInt(value) || 0;
        if(value < min) {
          value = min;
        }
        if(value > max) {
          value = max
        }
        return value;
      });
    }

    // TableSorter Config
    var CONFIG = {
      defaultOrdering: [
        "id",
        "code",
        "section",
        "name",
        "quantity",
        "threshold",
        "actions"
      ],
      columns: {
        id: {
          name: __("id"),
        },
        code: {
          name: __("code"),
          cellGenerator: makeTextItemInput("code")
        },
        section: {
          name: __("inventory::section"),
          cellGenerator: makeTextItemInput("section")
        },
        name: {
          name: __("name"),
          cellGenerator: makeTextItemInput("name")
        },
        quantity: {
          name: __("quantity"),
          cellGenerator: makeNumberItemInput("quantity")
        },
        threshold: {
          name: __("inventory::threshold"),
          cellGenerator: makeNumberItemInput("threshold", 0)
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
      <MKTableSorter
        config={CONFIG}
        items={this.state.items}
        striped
        bordered
        condensed
        hover
      />
    );
  }
});

module.exports = Items;

var React = require("react/addons");
var __ = require("language").__;
var MKItems = require("./Items");

var ItemList = React.createClass({
  render: function() {
    return (
      <div>
        <MKItems />
      </div>
    );
  }
});

module.exports = ItemList;

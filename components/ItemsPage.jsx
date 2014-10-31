var React = require("react/addons");
var MKItems = require("./Items");

var ItemsPage = React.createClass({
  render: function() {
    return (
      <div>
        <MKItems />
      </div>
    );
  }
});

module.exports = ItemsPage;

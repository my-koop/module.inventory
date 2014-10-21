var React = require("react/addons");
var style = require("grayBg.useable.less");
var __ = require("language").__;

var ItemList = React.createClass({
	componentDidMount: function(){
    style.use();
  },

  componentWillUnmount : function(){
    style.unuse();
  },

  render: function() {
		return <span>TEST3!!! <strong>{__("testString")}</strong> - <strong>{__("testString2")}</strong> - <strong>{__("inventory::itemList")}</strong></span>;
	}
});

module.exports = ItemList;

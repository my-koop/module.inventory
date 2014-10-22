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
		return <strong>{__("tmpString")}</strong>;
	}
});

module.exports = ItemList;

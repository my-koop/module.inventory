var React = require("react/addons");
var style = require("grayBg.useable.less");

var ItemList = React.createClass({
	componentDidMount: function(){
    style.use();
  },

  componentWillUnmount : function(){
    style.unuse();
  },

  render: function() {
		return <span>TEST3!!!</span>;
	}
});

module.exports = ItemList;

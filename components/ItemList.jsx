var React = require("react/addons");
var style = require("grayBg.useable.less");
var __ = require("language").__;
var MKItems = require("./Items");

var ItemList = React.createClass({
	componentDidMount: function(){
    style.use();
  },

  componentWillUnmount : function(){
    style.unuse();
  },

  render: function() {
		return (
      <div>
        <MKItems /> 
        <strong>{__("tmpString")}</strong>
      </div>
    ); 
	}
});

module.exports = ItemList;

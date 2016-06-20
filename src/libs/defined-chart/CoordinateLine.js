
"use strict";

var React = require("react");
var d3 = require("d3");
var Path = require("./Path");

var CoordinateLine = React.createClass({
    displayName: "CoordinateLine",

    render: function render() {
        var _props = this.props;
        var data = _props.coordinateData;
        var line = _props.line;
        var label = _props.label;
        var values = _props.values;
        var stroke = _props.stroke;
        var hidden = _props.hidden;

        var style = {
            display: hidden ? "none" : "block",
        };

        var lines = data.map(function (stack,index) {
			return React.createElement(Path, {
                key: "line" + new Date().getTime() + "." + index,
				className: "line",
				d: values(stack) && values(stack).length? line(values(stack)):"",
				stroke: "red",
                strokeWidth: "1",
                onMouseEnter: function(e){
                    e.preventDefault();
                },
                onMouseLeave: function(e){
                    e.preventDefault();
                },
                data : [],
                style: style
			});
		});
        return React.createElement(
			"g",
			null,
			lines
		);
    }
});

module.exports = CoordinateLine;
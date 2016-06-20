"use strict";
import * as d3 from "d3"
import React from 'react'

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Chart = require("./Chart");
var Axis = require("./Axis");
var Path = require("./Path");
var Tooltip = require("./Tooltip");

var DefaultPropsMixin = require("./DefaultPropsMixin");
var HeightWidthMixin = require("./HeightWidthMixin");
var ArrayifyMixin = require("./ArrayifyMixin");
var StackAccessorMixin = require("./StackAccessorMixin");
var StackDataMixin = require("./defineStackDataMixin");
var DefineScalesMixin = require("./DefineScalesMixin");
var TooltipMixin = require("./TooltipMixin");
var CoordinateLine = require("./CoordinateLine");

var DataSet = React.createClass({
	displayName: "DataSet",

	propTypes: {
		data: React.PropTypes.array.isRequired,
		area: React.PropTypes.func.isRequired,
		colorScale: React.PropTypes.func.isRequired,
		stroke: React.PropTypes.func.isRequired
	},

	render: function render() {
		var _props = this.props;
		var data = _props.data;
		var area = _props.area;
		var colorScale = _props.colorScale;
		var stroke = _props.stroke;
		var values = _props.values;
		var label = _props.label;
		var onMouseEnter = _props.onMouseEnter;
		var onMouseLeave = _props.onMouseLeave;

		var areas = data.map(function (stack, index) {
			return React.createElement(Path, {
				key: "" + label(stack) + "." + index,
				className: "area",
				stroke: "none",
				fill: colorScale(label(stack)),
				d: values(stack)&& values(stack).length?area(values(stack)):"",
				onMouseEnter: onMouseEnter,
				onMouseLeave: onMouseLeave,
				data: data
			});
		});

		return React.createElement(
			"g",
			null,
			areas
		);
	}
});

export const AreaChart = React.createClass({
	displayName: "AreaChart",

	mixins: [DefaultPropsMixin, HeightWidthMixin, ArrayifyMixin, StackAccessorMixin, StackDataMixin, DefineScalesMixin, TooltipMixin],

	propTypes: {
		interpolate: React.PropTypes.string,
		stroke: React.PropTypes.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			interpolate: "linear",
			defined: function () {
				return true;
			},
			yMax : 0,
			stroke: d3.scale.category20()
		};
	},

	_tooltipHtml: function _tooltipHtml(e,d, position) {
		var _props = this.props;
		var x = _props.x;
		var y0 = _props.y0;
		var y = _props.y;
		var data = this._data;
		var values = _props.values;
		var label = _props.label;
		var xScale = this._xScale;
		var yScale = this._yScale;
		var yScale1 = this._yScale1;
       
		var xValueCursor = xScale.invert(position[0]);

		var xBisector = d3.bisector(function (e) {
			return x(e);
		}).right;

		var xIndex = xBisector(values(d[0]), xScale.invert(position[0]));
		var arr = values(data[0]);
		var arr1 = values(data[1]);
		var xValue = x(arr[xIndex - 1]);
		var yValue = y(arr[xIndex - 1]);
		var yValue1 = y(arr1[xIndex - 1]);

		var xPos = xScale(xValue);
		var yPos = yScale(yValue);
		var yPos1 = yScale1(yValue1);
		var tooltipPos = yPos;

		// if(yPos1<yPos){
		// 	tooltipPos = yPos1;
		// }

		this.setState({
        	coordinateLine : {
        		hidden : false,
        		coordinateData : [{
        			values : [{x:xValue,y:0},{x:xValue,y:_props.yMax===0?yValue:_props.yMax}]
        		}]
        	}
        });

		return [this.props.tooltipHtml([yValue,yValue1], xValue), xPos, tooltipPos];
	},

	render: function render() {
		var _props = this.props;
		var height = _props.height;
		var interpolate = _props.interpolate;
		var defined = _props.defined;
		var width = _props.width;
		var margin = _props.margin;
		var colorScale = _props.colorScale;
		var interpolate = _props.interpolate;
		var yAxisL = _props.yAxisL;
		var stroke = _props.stroke;
		var offset = _props.offset;
		var values = _props.values;
		var label = _props.label;
		var viewBox = _props.viewBox;
		var preserveAspectRatio = _props.preserveAspectRatio;
		var style = _props.style;
		var x = _props.x;
		var y = _props.y;
		var y0 = _props.y0;
		var xAxis = _props.xAxis;
	    var maxY = _props.maxY;
		var yAxis = _props.yAxis;
		var data = this._data;
		var innerWidth = this._innerWidth;
		var innerHeight = this._innerHeight;
		var xScale = this._xScale;
		var yScale = this._yScale;
		var yScale1 = this._yScale1;
		
		var separate = _props.separate;

		var stack = d3.layout.stack().offset("zero").order("default").x(x).y(y).values(values);
		var data1 = stack([data[1]]);

		var line = d3.svg.line().x(function (e) {
			return xScale(x(e));
		}).y(function (e) {
			return yScale(y(e));
		}).interpolate(interpolate).defined(defined);

		var area = d3.svg.area().x(function (e) {
				return xScale(x(e));
			}).y0(function (e) {
				return yScale(yScale.domain()[0] + y0(e));
			}).y1(function (e) {
				return yScale(y0(e) + y(e));
			}).interpolate(interpolate);

		var area1 = d3.svg.area().x(function (e) {
				return xScale(x(e));
			}).y0(function (e) {
				return yScale1(yScale1.domain()[0] + y0(e));
			}).y1(function (e) {
				return yScale1(y0(e) + y(e));
			}).interpolate(interpolate);

		return React.createElement(
			"div",
			null,
			React.createElement(
				Chart,
				{ height: height, 
				  width: width, 
				  margin: margin, 
				  viewBox : viewBox, 
				  preserveAspectRatio : preserveAspectRatio,
				  style : style },
				React.createElement(DataSet, {
					data: [data[0]],
					area: area,
					colorScale: function(){
						return "rgba(111, 179, 83, 0.3)"
					},
					stroke: stroke,
					label: label,
					values: values,
					onMouseEnter: this.onMouseEnter,
					onMouseLeave: this.onMouseLeave
				}),
				React.createElement(DataSet, {
					data: [data[1]],
					area: area1,
					colorScale: function(){
						return "rgba(220,220,124,0.2)"
					},
					stroke: stroke,
					label: label,
					values: values,
					onMouseEnter: this.onMouseEnter,
					onMouseLeave: this.onMouseLeave
				}),
				React.createElement(CoordinateLine, _extends({
					line: line,
					area: area,
					colorScale: colorScale,
					stroke: stroke,
					xScale: xScale,
					yScale: yScale,
					label: label,
					values: values
				},this.state.coordinateLine)),
				React.createElement(Axis, _extends({
					className: "x axis",
					orientation: "bottom",
					scale: xScale,
					height: innerHeight,
					width: innerWidth
				}, xAxis)),
				React.createElement(Axis, _extends({
					className: "y axis",
					orientation: "left",
					scale: yScale,
					height: innerHeight,
					width: innerWidth
				}, yAxis)),
				React.createElement(Axis, _extends({
					className: "y axis",
					orientation: "right",
					scale: yScale1,
					height: innerHeight,
					width: innerWidth
				}, yAxisL)),
				this.props.children
			),
			React.createElement(Tooltip, this.state.tooltip)
		);
	}
});
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
var StackDataMixin = require("./StackDataMixin");
var DefaultScalesMixin = require("./DefaultScalesMixin");
var TooltipMixin = require("./TooltipMixin");
var CoordinateLine = require("./CoordinateLine");

var DataSet = React.createClass({
	displayName: "DataSet",

	propTypes: {
		data: React.PropTypes.array.isRequired,
		area: React.PropTypes.func.isRequired,
		line: React.PropTypes.func.isRequired,
		colorScale: React.PropTypes.func.isRequired,
		stroke: React.PropTypes.func.isRequired
	},

	render: function render() {
		var _props = this.props;
		var data = _props.data;
		var equipmentCityData = _props.equipmentCityData;
		var area = _props.area;
		var line = _props.line;
		var colorScale = _props.colorScale;
		var lineStrokeFun = _props.lineStrokeFun;
		var stroke = _props.stroke;
		var values = _props.values;
		var label = _props.label;
		var onMouseEnter = _props.onMouseEnter;
		var onMouseLeave = _props.onMouseLeave;

        var lines = equipmentCityData.map(function(stack, index){
        	return React.createElement(Path, {
				key: "" + label(stack) + "." + index,
				className: "line",
				stroke: lineStrokeFun(index,label(stack)),
				d: values(stack)&& values(stack).length?line(values(stack)):"",
				onMouseEnter: onMouseEnter,
				onMouseLeave: onMouseLeave,
				data: data
			});
        })
        

		return React.createElement(
			"g",
			null,
			React.createElement(Path, {
				className: "area",
				stroke: "none",
				fill: colorScale(label(data[0])),
				d: values(data[0]) && values(data[0]).length ? area(values(data[0])):"",
				onMouseEnter: onMouseEnter,
				onMouseLeave: onMouseLeave,
				data: [data[0]]
			}),
			lines
		);
	}
});

export const EquipmentChart = React.createClass({
	displayName: "EquipmentChart",

	mixins: [DefaultPropsMixin, HeightWidthMixin, ArrayifyMixin, StackAccessorMixin, StackDataMixin, DefaultScalesMixin, TooltipMixin],

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
		var data = _props.data;
		var x = _props.x;
		var y = _props.y;
		var cityEquipmentData = _props.cityEquipmentData;
		var values = _props.values;
		var label = _props.label;
		var xScale = this._xScale;
		var yScale = this._yScale;

		var xValueCursor = xScale.invert(position[0]);

		var xBisector = d3.bisector(function (e) {
			return x(e);
		}).right;

		var xIndex = xBisector(values(d[0]), xScale.invert(position[0]));
		var xData =  values(data[0]).map(function(stack,index){
			return x(stack);
		});
		var xValue = xData[xIndex - 1];
		var yData = values(data[0]).map(function(stack,index){
			return y(stack);
		});
		var yValue = yData[xIndex - 1];

		var equipmentData = cityEquipmentData.map(function(stack, index){
			var areaName = stack.label;
			var currentArr = values(stack).map(function(value,key){
				return y(value);
			});
			return {
				areaName : areaName,
				yValue : currentArr[xIndex - 1]
			}
		});

		var xPos = xScale(xValue);
		var yPos = yScale(yValue);

		this.setState({
        	coordinateLine : {
        		hidden : false,
        		coordinateData : [{
        			values : [{x:xValue,y:0},{x:xValue,y:_props.yMax===0?yValue:_props.yMax}]
        		}]
        	}
        });

		return [this.props.tooltipHtml(yValue, equipmentData, xValue), xPos, yPos];
	},

	render: function render() {
		var _props = this.props;
		var height = _props.height;
		var equipmentCityData = _props.cityEquipmentData;
		var interpolate = _props.interpolate;
		var defined = _props.defined;
		var width = _props.width;
		var margin = _props.margin;
		var colorScale = _props.colorScale;
		var interpolate = _props.interpolate;
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
		var xIntercept = this._xIntercept;
		var yIntercept = this._yIntercept;
		var lineStrokeFun = _props.lineStrokeFun;

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
					data: data,
					area: area,
					equipmentCityData: equipmentCityData,
					colorScale: colorScale,
					lineStrokeFun: lineStrokeFun,
					line: line,
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
				}, this.state.coordinateLine)),
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
				this.props.children
			),
			React.createElement(Tooltip, this.state.tooltip)
		);
	}
});
import React from 'react'
import { isEmptyObj, generateMixed } from 'libs/function'

import * as d3 from "d3"
var DefaultPropsMixin = require("./DefaultPropsMixin");
var HeightWidthMixin = require("./HeightWidthMixin");
var AccessorMixin = require("./AccessorMixin");
var TooltipMixin = require("./TooltipMixin");
var Tooltip = require("./Tooltip");
var Chart = require("./Chart");
var Path = require("./Path");

var Wedge = React.createClass({
    propTypes: {
        d: React.PropTypes.string.isRequired,
        fill: React.PropTypes.string.isRequired
    },

    render: function render() {
        var _props = this.props;
        var fill = _props.fill;
        var d = _props.d;
        var stroke = _props.stroke;
        var data = _props.data;
        var onMouseEnter = _props.onMouseEnter;
        var onMouseLeave = _props.onMouseLeave;

        return React.createElement("path", {
            fill: fill,
            d: d,
            stroke: stroke,
            onMouseMove: function (evt) {
                onMouseEnter(evt, data);
            },
            onMouseLeave: function (evt) {
                onMouseLeave(evt);
            }
        });
    }
});

var DataSet = React.createClass({

    getDefaultProps: function getDefaultProps() {
        return {
            strokeWidth: 2,
            stroke: "#000",
            fill: "none",
            opacity: 0.3
        };
    },

    render: function render() {
        var _props = this.props;
        var pie = _props.pie;
        var arc = _props.arc;
        var outerArc = _props.outerArc;
        var colorScale = _props.colorScale;
        var outArcColorScale = _props.outArcColorScale;
        var radius = _props.radius;
        var strokeWidth = _props.strokeWidth;
        var stroke = _props.stroke;
        var fill = _props.fill;
        var opacity = _props.opacity;
        var x = _props.x;
        var y = _props.y;
        var Highlight = _props.Highlight;
        var onMouseEnter = _props.onMouseEnter;
        var onMouseLeave = _props.onMouseLeave;

        var wedges = pie.map(function (e, index) {
            var yValue = y(e["data"]);
            var areaName = x(e["data"]);
            var d = arc(e);
            var strokeColor = "none";
            
            if(Highlight !== null && Highlight["type"] !== "status" ){
                if(areaName === Highlight["x"]){
                    strokeColor = "rgba(255,255,255,1)";
                }
            }

            var outPie = d3.layout
                           .pie()
                           .startAngle(e.startAngle)
                           .endAngle(e.endAngle)
                           .value(function (e) {
                                return y(e);
                            });

            var outPieData = outPie(yValue["children"]);

            var outd = outPieData.map(function(stack,index){
                var out = outerArc(stack),
                    outStroke = "none";
                 
                if(Highlight !== null && Highlight["type"] === "status" ){
                    if(areaName === Highlight["areaName"] && x(stack["data"]) === Highlight["x"]){
                        outStroke = "rgba(255,255,255,1)";
                    }
                }
                
                return React.createElement(Path, {
                    key: "."+x(stack.data)+"."+y(stack.data)+"."+index,
                    data: [stack.data],
                    fill: outArcColorScale(x(stack.data),index),
                    stroke: outStroke,
                    strokeWidth: "2",
                    d: out,
                    onMouseEnter: function(evt){
                        var obj = stack.data;
                            obj.type = "status";
                            obj.areaName = x(e["data"]);

                        onMouseEnter(evt, obj);
                    },
                    onMouseLeave: function(evt){
                        onMouseLeave(evt);
                    }
                })
            })

            return React.createElement(
                "g",
                { key: "" + x(e.data) + "." + y(e.data) + "." + index, className: "arc" },
                outd,
                React.createElement(Wedge, {
                    data: e.data,
                    fill: colorScale(index),
                    stroke: strokeColor,
                    d: d,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave
                })
            );
        });
        
        return React.createElement(
            "g",
            null,
            wedges
        );
    }
});

export const StroagePie =  React.createClass({
    mixins: [DefaultPropsMixin, HeightWidthMixin, AccessorMixin, TooltipMixin],

    getInitialState: function(){
        return {
            data : null
        }
    },

    _tooltipHtml: function _tooltipHtml(e, d, position) {
        var html = this.props.tooltipHtml(d);
        this.setState({
            data : d
        });
        return [html, 0, 0];
    },

    render : function render(){
        var _props = this.props;
        var data = _props.data;
        var width = _props.width;
        var height = _props.height;
        var style = _props.style;
        var margin = _props.margin;
        var colorScale = _props.colorScale;
        var outArcColorScale = _props.outArcColorScale;
        var innerRadius = _props.innerRadius;
        var outerRadius = _props.outerRadius;
        var labelRadius = _props.labelRadius;
        var padRadius = _props.padRadius;
        var cornerRadius = _props.cornerRadius;
        var sort = _props.sort;
        var x = _props.x;
        var y = _props.y; 
        var values = _props.values;
        var innerWidth = this._innerWidth;
        var innerHeight = this._innerHeight;
        var Highlight = this.state.data;

        var pie = d3.layout.pie().value(function (e) {
            var parents = y(e);
            return parents["total"];
        });

        if(this.state.tooltip.hidden){
            Highlight = null;
        }
                                                                                                                                                                               
        if (typeof sort !== "undefined") {
            pie = pie.sort(sort);
        }

        var radius = Math.min(innerWidth, innerHeight) / 2;
        if (!innerRadius) {
            innerRadius = radius * 0.8;
        }

        if (outerRadius === undefined) {
            outerRadius = radius * 0.3;
        }

        if (!labelRadius) {
            labelRadius = radius * 0.9;
        }

        var arc = d3.svg.arc().innerRadius(innerRadius)
                              .outerRadius(outerRadius)
                              .padRadius(padRadius)
                              .cornerRadius(cornerRadius);

        var outerArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(labelRadius);

        var pieData = pie(values(data));

        var translation = "translate(" + innerWidth / 2 + ", " + innerHeight / 2 + ")";
        return React.createElement(
            "div",
            null,
            React.createElement(
                Chart,
                { height: height, width: width, margin: margin, style: style },
                React.createElement(
                    "g",
                    { transform: translation },
                    React.createElement(DataSet, {
                        width: innerWidth,
                        height: innerHeight,
                        colorScale: colorScale,
                        outArcColorScale: outArcColorScale,
                        Highlight: Highlight,
                        pie: pieData,
                        arc: arc,
                        outerArc: outerArc,
                        radius: radius,
                        x: x,
                        y: y,
                        onMouseEnter: this.onMouseEnter,
                        onMouseLeave: this.onMouseLeave
                    })
                ),
                this.props.children
            ),
            React.createElement(Tooltip, this.state.tooltip)
        );
    }

});
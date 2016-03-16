import React from 'react'
import { isEmptyObj, generateMixed } from 'libs/function'
import { Chart } from './Chart'
import * as d3 from "d3"
var DefaultPropsMixin = require("./DefaultPropsMixin");
var HeightWidthMixin = require("./HeightWidthMixin");
var AccessorMixin = require("./AccessorMixin");
var TooltipMixin = require("./TooltipMixin");
var Tooltip = require("./Tooltip");

var Wedge = React.createClass({
    propTypes: {
        d: React.PropTypes.string.isRequired,
        fill: React.PropTypes.string.isRequired
    },

    render: function render() {
        var _props = this.props;
        var fill = _props.fill;
        var d = _props.d;
        var data = _props.data;
        var onMouseEnter = _props.onMouseEnter;
        var onMouseLeave = _props.onMouseLeave;

        return React.createElement("path", {
            fill: fill,
            d: d,
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
        var radius = _props.radius;
        var strokeWidth = _props.strokeWidth;
        var stroke = _props.stroke;
        var fill = _props.fill;
        var opacity = _props.opacity;
        var x = _props.x;
        var y = _props.y;
        var onMouseEnter = _props.onMouseEnter;
        var onMouseLeave = _props.onMouseLeave;

        var wedges = pie.map(function (e, index) {
            function midAngle(d) {
                return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }

            var d = arc(e);

            var labelPos = outerArc.centroid(e);
            labelPos[0] = radius * (midAngle(e) < Math.PI ? 1 : -1);

            var textAnchor = midAngle(e) < Math.PI ? "start" : "end";

            var linePos = outerArc.centroid(e);
            linePos[0] = radius * 0.95 * (midAngle(e) < Math.PI ? 1 : -1);

            return React.createElement(
                "g",
                { key: "" + x(e.data) + "." + y(e.data) + "." + index, className: "arc" },
                React.createElement(Wedge, {
                    data: e.data,
                    fill: colorScale(x(e.data)),
                    d: d,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave
                })
            );
        });
        
        console.log("11111111111111111111111111111111111111111");
        return React.createElement(
            "g",
            null,
            wedges
        );
    }
});

export const Pie =  React.createClass({
    mixins: [DefaultPropsMixin, HeightWidthMixin, AccessorMixin, TooltipMixin],

    _tooltipHtml: function _tooltipHtml(d, position) {
        var html = this.props.tooltipHtml(this.props.x(d), this.props.y(d));

        return [html, 0, 0];
    },

    render : function render(){
        var _props = this.props;
        var data = _props.data;
        var width = _props.width;
        var height = _props.height;
        var margin = _props.margin;
        var colorScale = _props.colorScale;
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
        var viewBox = _props.viewBox;
        var preserveAspectRatio = _props.preserveAspectRatio;
        var className =  _props.className;
        var style = _props.style;

        var pie = d3.layout.pie().value(function (e) {
            return y(e);
        });

        if (typeof sort !== "undefined") {
            pie = pie.sort(sort);
        }

        var radius = Math.min(innerWidth, innerHeight) / 2;
        if (!innerRadius) {
            innerRadius = radius * 0.9;
        }

        if (!outerRadius) {
            //outerRadius = radius * 0.4;
        }

        if (!labelRadius) {
           // labelRadius = radius * 0.9;
        }

        var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).padRadius(padRadius).cornerRadius(cornerRadius);

        var outerArc = d3.svg.arc().innerRadius(labelRadius).outerRadius(labelRadius);

        var pieData = pie(values(data));

        var translation = "translate(" + innerWidth / 2 + ", " + innerHeight / 2 + ")";

        return React.createElement(
            "div",
            null,
            React.createElement( 
                Chart,
                {    
                     height: height, 
                     width: width, 
                     margin: margin, 
                     viewBox: viewBox, 
                     preserveAspectRatio: preserveAspectRatio,
                     style : style,
                     className : className
                 },
                React.createElement(
                    "g",
                    { transform: translation },
                    React.createElement(DataSet, {
                        width: innerWidth,
                        height: innerHeight,
                        colorScale: colorScale,
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
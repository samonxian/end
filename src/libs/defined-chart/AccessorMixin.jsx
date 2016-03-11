"use strict";

var React = require("react");

var AccessorMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            label: function (stack) {
                return stack.label;
            },
            values: function (stack) {
                return stack.values;
            },
            x: function (e) {
                return e.x;
            },
            y: function (e) {
                return e.y;
            },
            y0: function (e) {
                return 0;
            }
        };
    }
};

module.exports = AccessorMixin;
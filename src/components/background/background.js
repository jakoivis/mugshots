"use strict";

var BasicContainer = require("components/basicContainer.js");
var BackgroundBitmap = require("components/background/backgroundBitmap.js");

var Background = function() {

    var me = this;

    var _backgroundBitmap;

    me.initialize = function() {

        _backgroundBitmap = new BackgroundBitmap();
    };

    me.onApplicationStart = function() {

        me.addChild(_backgroundBitmap);
    };

    me.onResize = function() {

    };

    me.BasicContainer_constructor();
};

createjs.extend(Background, BasicContainer);

module.exports = createjs.promote(Background, "BasicContainer");
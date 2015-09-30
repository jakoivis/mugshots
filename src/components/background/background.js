"use strict";

var BasicContainer = require("components/basicContainer.js");
var BackgroundBitmap = require("components/background/backgroundBitmap.js");
var ScaleUtil = require("utils/scaleUtil.js");

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

        var dimensions = ScaleUtil.fill(
                            _backgroundBitmap.width,
                            _backgroundBitmap.height,
                            me.stageWidth,
                            me.stageHeight);

        _backgroundBitmap.x = dimensions.x;
        _backgroundBitmap.y = dimensions.y;
        _backgroundBitmap.scaleX = dimensions.scale;
        _backgroundBitmap.scaleY = dimensions.scale;
    };

    me.BasicContainer_constructor();
};

createjs.extend(Background, BasicContainer);

module.exports = createjs.promote(Background, "BasicContainer");
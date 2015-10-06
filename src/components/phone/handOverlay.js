"use strict";

var BasicContainer = require("../../components/basicContainer.js");
var LittleFingerBitmap = require("../../components/phone/littleFingerBitmap.js");
var ThumbBitmap = require("../../components/phone/thumbBitmap.js");
var ThumbPressedBitmap = require("../../components/phone/thumbPressedBitmap.js");

var HandOverlay = function() {

    var me = this;

    var _littleFingerBitmap;
    var _thumbBitmap;
    var _thumbPressedBitmap;

    me.initialize = function() {

        _littleFingerBitmap = new LittleFingerBitmap();
        _thumbBitmap = new ThumbBitmap();
        _thumbPressedBitmap = new ThumbPressedBitmap();
    };

    me.onApplicationStart = function() {

        _littleFingerBitmap.x = 23;
        _littleFingerBitmap.y = 767;

        _thumbBitmap.y = 550;
        _thumbBitmap.x = 23;
        _thumbPressedBitmap.alpha = 0;

        me.addChild(_littleFingerBitmap);
        me.addChild(_thumbBitmap);
        me.addChild(_thumbPressedBitmap);
    };

    me.press = function() {

    };

    me.BasicContainer_constructor();
};

createjs.extend(HandOverlay, BasicContainer);

module.exports = createjs.promote(HandOverlay, "BasicContainer");
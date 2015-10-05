"use strict";

var BasicContainer = require("../../components/basicContainer.js");
var LittleFingerBitmap = require("../../components/phone/littleFingerBitmap.js");

var HandThumb = function() {

    var me = this;

    var _littleFingerBitmap;

    me.initialize = function() {

        _littleFingerBitmap = new LittleFingerBitmap();
    };

    me.onApplicationStart = function() {

        _littleFingerBitmap.x = 23;
        _littleFingerBitmap.y = 767;

        me.addChild(_littleFingerBitmap);
    };

    // function maskHandBitmap() {

    //     _handMaskBitmap.cache(0, 0, _handMaskBitmap.width, _handMaskBitmap.height);
    //     _handBitmap.filters = [new createjs.AlphaMaskFilter(_handMaskBitmap.cacheCanvas)];
    //     _handBitmap.cache(0, 0, _handBitmap.width, _handBitmap.height);
    // }

    me.BasicContainer_constructor();
};

createjs.extend(HandThumb, BasicContainer);

module.exports = createjs.promote(HandThumb, "BasicContainer");
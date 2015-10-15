"use strict";

var BasicContainer = require("../components/basicContainer.js");
var HandBitmap = require("../components/bitmap/handBitmap.js");
var HandMaskBitmap = require("../components/bitmap/handMaskBitmap.js");
var FingersBitmap = require("../components/bitmap/fingersBitmap.js");

var Hand = function() {

    var me = this;

    var _handBitmap;
    var _handMaskBitmap;
    var _fingersBitmap;

    me.initialize = function() {

        _handBitmap = new HandBitmap();
        _handMaskBitmap = new HandMaskBitmap();
        _fingersBitmap = new FingersBitmap();
    };

    me.onApplicationStart = function() {

        maskHandBitmap();

        _handBitmap.x = 20;
        _handBitmap.y = 440;

        _fingersBitmap.x = -109;
        _fingersBitmap.y = 440;

        me.addChild(_handBitmap);
        me.addChild(_fingersBitmap);
    };

    function maskHandBitmap() {

        _handMaskBitmap.cache(0, 0, _handMaskBitmap.width, _handMaskBitmap.height);
        _handBitmap.filters = [new createjs.AlphaMaskFilter(_handMaskBitmap.cacheCanvas)];
        _handBitmap.cache(0, 0, _handBitmap.width, _handBitmap.height);
    }

    me.BasicContainer_constructor();
};

createjs.extend(Hand, BasicContainer);

module.exports = createjs.promote(Hand, "BasicContainer");
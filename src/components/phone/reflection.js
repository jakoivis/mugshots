"use strict";

var BasicContainer = require("components/basicContainer.js");
var ReflectionMaskBitmap = require("components/phone/reflectionMaskBitmap.js");

var Reflection = function() {

    var me = this;

    var _reflectionMaskBitmap;

    me.initialize = function() {

        _reflectionMaskBitmap = new ReflectionMaskBitmap();
    };

    me.onApplicationStart = function() {

        // var shape = new createjs.Shape();
        // shape.graphics.beginFill("#FF0000");
        // shape.graphics.drawRect(0, 0, _reflectionMaskBitmap.width, _reflectionMaskBitmap.height);
        // shape.cache(0, 0, _reflectionMaskBitmap.width, _reflectionMaskBitmap.height);

        // me.addChild(shape);

        maskReflection();
    };

    function maskReflection() {

        _reflectionMaskBitmap.cache(0, 0, _reflectionMaskBitmap.width, _reflectionMaskBitmap.height);
        me.filters = [new createjs.AlphaMaskFilter(_reflectionMaskBitmap.cacheCanvas)];
        me.cache(0, 0, _reflectionMaskBitmap.width, _reflectionMaskBitmap.height);
    }

    me.BasicContainer_constructor();
};

createjs.extend(Reflection, BasicContainer);

module.exports = createjs.promote(Reflection, "BasicContainer");
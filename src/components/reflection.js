"use strict";

var BasicContainer = require("../components/basicContainer.js");
var ReflectionMaskBitmap = require("../components/bitmap/reflectionMaskBitmap.js");

var Reflection = function() {

    var me = this;

    var _reflectionMaskBitmap;
    var _glow;

    Object.defineProperty(this, "glow", {

        get: function() { return _glow; }
    });

    me.initialize = function() {

        _reflectionMaskBitmap = new ReflectionMaskBitmap();
    };

    me.onApplicationStart = function() {

        _glow = createGlow();

        me.addChild(_glow);

        maskReflection();
    };

    me.onTick = function() {

        me.updateCache();
    };

    function createGlow() {

        var container = new createjs.Container();

        var reflectionHeight = _reflectionMaskBitmap.height /4;
        var shape = new createjs.Shape();
        var colors = ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.0)"];
        var ratios = [0, 1];
        shape.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, reflectionHeight);
        shape.graphics.drawRect(0, 0, _reflectionMaskBitmap.width*2, reflectionHeight);
        shape.rotation = 30;
        shape.y = _reflectionMaskBitmap.height /-4;
        container.addChild(shape);

        shape = new createjs.Shape();
        shape.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, reflectionHeight);
        shape.graphics.drawRect(0, 0, _reflectionMaskBitmap.width*2, reflectionHeight);
        shape.rotation = 30;
        shape.y = _reflectionMaskBitmap.height /2;
        container.addChild(shape);

        container.alpha = 0.15;

        return container;
    }

    function maskReflection() {

        _reflectionMaskBitmap.cache(0, 0, _reflectionMaskBitmap.width, _reflectionMaskBitmap.height);
        me.filters = [new createjs.AlphaMaskFilter(_reflectionMaskBitmap.cacheCanvas)];
        me.cache(0, 0, _reflectionMaskBitmap.width, _reflectionMaskBitmap.height);
    }

    me.BasicContainer_constructor();
};

createjs.extend(Reflection, BasicContainer);

module.exports = createjs.promote(Reflection, "BasicContainer");
"use strict";

var BasicBitmap = require("components/basicBitmap.js");

var ReflectionMaskBitmap = function() {

    var me = this;

    Object.defineProperty(this, "width", {

        get: function() { return me.image.width; }
    });

    Object.defineProperty(this, "height", {

        get: function() { return me.image.height; }
    });

    this.getAcceptedResourceName = function() {

        return "reflectionMask";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(ReflectionMaskBitmap, BasicBitmap);

module.exports = createjs.promote(ReflectionMaskBitmap, "BasicBitmap");
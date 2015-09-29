"use strict";

var BasicBitmap = require("components/basicBitmap.js");

var ReflectionMaskBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "reflectionMask";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(ReflectionMaskBitmap, BasicBitmap);

module.exports = createjs.promote(ReflectionMaskBitmap, "BasicBitmap");
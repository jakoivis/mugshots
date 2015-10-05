"use strict";

var BasicBitmap = require("../../components/basicBitmap.js");

var HandMaskBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "handMask";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(HandMaskBitmap, BasicBitmap);

module.exports = createjs.promote(HandMaskBitmap, "BasicBitmap");
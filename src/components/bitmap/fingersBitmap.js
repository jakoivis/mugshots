"use strict";

var BasicBitmap = require("./basicBitmap.js");

var FingersBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "fingers";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(FingersBitmap, BasicBitmap);

module.exports = createjs.promote(FingersBitmap, "BasicBitmap");
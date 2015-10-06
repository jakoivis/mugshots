"use strict";

var BasicBitmap = require("../../components/basicBitmap.js");

var ThumbPressedBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "thumbPressed";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(ThumbPressedBitmap, BasicBitmap);

module.exports = createjs.promote(ThumbPressedBitmap, "BasicBitmap");
"use strict";

var BasicBitmap = require("../../components/basicBitmap.js");

var ThumbBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "thumb";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(ThumbBitmap, BasicBitmap);

module.exports = createjs.promote(ThumbBitmap, "BasicBitmap");
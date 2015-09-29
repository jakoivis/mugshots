"use strict";

var BasicBitmap = require("components/basicBitmap.js");

var BackgroundBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "applicationBackground";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(BackgroundBitmap, BasicBitmap);

module.exports = createjs.promote(BackgroundBitmap, "BasicBitmap");
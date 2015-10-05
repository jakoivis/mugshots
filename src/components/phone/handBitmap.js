"use strict";

var BasicBitmap = require("../../components/basicBitmap.js");

var HandBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "hand";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(HandBitmap, BasicBitmap);

module.exports = createjs.promote(HandBitmap, "BasicBitmap");
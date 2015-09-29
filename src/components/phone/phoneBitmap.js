"use strict";

var BasicBitmap = require("components/basicBitmap.js");

var PhoneBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "phone";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(PhoneBitmap, BasicBitmap);

module.exports = createjs.promote(PhoneBitmap, "BasicBitmap");
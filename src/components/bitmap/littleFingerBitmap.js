"use strict";

var BasicBitmap = require("./basicBitmap.js");

var LittleFingerBitmap = function() {

    this.getAcceptedResourceName = function() {

        return "littleFinger";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(LittleFingerBitmap, BasicBitmap);

module.exports = createjs.promote(LittleFingerBitmap, "BasicBitmap");
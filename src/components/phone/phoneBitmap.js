"use strict";

var BasicBitmap = require("components/basicBitmap.js");

var PhoneBitmap = function() {

    var me = this;

    Object.defineProperty(this, "width", {

        get: function() { return me.image.width; }
    });

    Object.defineProperty(this, "height", {

        get: function() { return me.image.height; }
    });

    this.getAcceptedResourceName = function() {

        return "phone";
    };

    this.BasicBitmap_constructor();
};

createjs.extend(PhoneBitmap, BasicBitmap);

module.exports = createjs.promote(PhoneBitmap, "BasicBitmap");
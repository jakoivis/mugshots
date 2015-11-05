
"use strict";

var BasicContainer = require("../../components/basicContainer.js");
var Face = require("../../components/face.js");

var ScreenContentPreloader = function(width, height) {

    var me = this;

    var _face;

    Object.defineProperty(this, "face", {

        get: function() { return _face; }
    });

    me.initialize = function() {

        _face = new Face();
    };

    me.update = function() {

        _face.update();
    };
    // me.onTick = function() {

    //     _spinner.update();
    // };

    me.show = function() {

        me.addChild(_face);
    };

    me.BasicContainer_constructor();
};

var proto  = createjs.extend(ScreenContentPreloader, BasicContainer);

module.exports = createjs.promote(ScreenContentPreloader, "BasicContainer");
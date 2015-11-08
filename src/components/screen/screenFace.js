
"use strict";

var BasicContainer = require("../../components/basicContainer.js");
var Face = require("../../components/face.js");
var ScreenFlash = require("../../components/screen/screenFlash.js");

var ScreenPreloader = function(width, height) {

    var me = this;

    var _face;
    var _screenFlash;

    Object.defineProperty(this, "face", {

        get: function() { return _face; }
    });

    Object.defineProperty(this, "screenFlash", {

        get: function() { return _screenFlash; }
    });

    me.initialize = function() {

        _face = new Face();
        _screenFlash = new ScreenFlash(width, height);
    };

    me.show = function() {

        me.alpha = 0;

        me.addChild(_face);
        // me.addChild(_screenFlash);

        var easing = createjs.Ease.sineInOut;
        var duration = 1000;

        createjs.Tween
            .get(me)
            .to({alpha:1}, duration, easing);

        addClickHandler();
    };

    function addClickHandler() {
        me.on("click", function() {
            _face.setRandomFaceParts();
            _face.setRandomPositions();
            // _screenFlash.flash();
            _face.update();
        });
    }

    me.BasicContainer_constructor();
};

var proto  = createjs.extend(ScreenPreloader, BasicContainer);

module.exports = createjs.promote(ScreenPreloader, "BasicContainer");
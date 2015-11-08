
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
        me.setMouseEnabled();
    };

    me.onResize = function() {

        setScale();
        setRotation();
    };

    me.onMouseMove = function() {

        setScale();
        setRotation();
    };

    function setScale() {

        var faceBaseScale = 0.8;
        var minScale = faceBaseScale * 0.6;
        var scaleRange = faceBaseScale - minScale;
        var scalePosition = calculateScalePosition();
        var scale = minScale + scaleRange * scalePosition;

        var easing = createjs.Ease.sineInOut;
        var duration = 120;

        createjs.Tween
            .get(_face, {override: true})
            .to({scaleX:scale, scaleY:scale}, duration, easing);
    }

    function calculateScalePosition() {

        var scaleStartPct = 0.3;
        var mouseY = me.stage.mouseY;
        var scaleAreaHeight = me.stageHeight * scaleStartPct;
        var scalePosition = mouseY / scaleAreaHeight;

        scalePosition = scalePosition > 1 ? 1 : scalePosition;

        return scalePosition;
    }

    function setRotation() {

        var mouseX = me.stage.mouseX;
        var originX = me.stageWidth / 2;
        var distanceX = originX - mouseX;
        var rotation = distanceX * 0.01;
        var offset = rotation * 10;
        var inversedRotation = rotation *-1;
        var inversedOffset = offset *-1;

        _face.rotation = inversedRotation;
        _face.x = width / 2 + inversedOffset;
        _face.y = height / 2;
    }

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
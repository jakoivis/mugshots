
"use strict";

var BasicContainer = require("../components/basicContainer.js");
var PhoneBitmap = require("../components/bitmap/phoneBitmap.js");
var Screen = require("../components/screen.js");
var Reflection = require("../components/reflection.js");
var Hand = require("../components/hand.js");
var HandOverlay = require("../components/handOverlay.js");

var Phone = function() {

    var me = this;

    var _screen;
    var _phoneBitmap;
    var _scaleContainer;
    var _reflection;
    var _hand;
    var _handOverlay;

    var _baseScale;

    me.initialize = function() {
        console.log("initialize");

        me.setMouseDisabled();

        _screen = new Screen();
        _phoneBitmap = new PhoneBitmap();
        _reflection = new Reflection();
        _hand = new Hand();
        _handOverlay = new HandOverlay();
    };

    me.onApplicationStart = function() {
        console.log("onApplicationStart");

    };

    me.onRequiredFilesComplete = function() {
        console.log("onRequiredFilesComplete");
        _scaleContainer = createScaleContainer(_phoneBitmap);

        // _scaleContainer.addChild(_hand);
        _scaleContainer.addChild(_phoneBitmap);
        _scaleContainer.addChild(_screen);
        _scaleContainer.addChild(_reflection);
        // _scaleContainer.addChild(_handOverlay);
        me.addChild(_scaleContainer);

        update();
    };

    me.addedToStage = function() {
        console.log("addedToStage");
        var easing = createjs.Ease.sineInOut;
        var duration = 1200;

        createjs.Tween
            .get(_scaleContainer)
            .to({alpha:1}, duration, easing)
            .call(addClickHandler)
            .call(me.setMouseEnabled);
    };

    me.onResize = function() {

        console.log("onResize");

        me.x = me.stageWidth / 2;
        me.y = me.stageHeight / 2;

        _baseScale = calculateBaseScale();

        setScale();
        setRotation();
    };

    function createScaleContainer(phoneBitmap) {

        var container = new createjs.Container();
        container.regX = phoneBitmap.image.width / 2;
        container.regY = phoneBitmap.image.height / 2;
        container.alpha = 0;

        return container;
    }

    function update() {

        _screen.update();
    }

    me.onMouseMove = function() {

        setScale();
        setRotation();
        setReflectionPosition();
    };

    function setScale() {

        // top 30% of the screen is the area in which the
        // scaling happens. otherwise phone doesn't scale
        // when mouse is at 30% from the top, scaling is at max
        // when mouse is at 0% from the top, scaling is at min

        setScaleContainerScale();
        setFaceScale();
    }

    function setScaleContainerScale() {

        var minScale = _baseScale * 0.5;
        var scaleRange = _baseScale - minScale;
        var scalePosition = calculateScalePosition();
        var scale = minScale + scaleRange * scalePosition;

        var easing = createjs.Ease.sineInOut;
        var duration = 120;

        createjs.Tween
            .get(_scaleContainer, {override: true})
            .to({scaleX:scale, scaleY:scale}, duration, easing);
    }

    function setFaceScale() {

        var faceBaseScale = 0.8;
        var minScale = faceBaseScale * 0.6;
        var scaleRange = faceBaseScale - minScale;
        var scalePosition = calculateScalePosition();
        var scale = minScale + scaleRange * scalePosition;

        var easing = createjs.Ease.sineInOut;
        var duration = 120;

        createjs.Tween
            .get(_screen.face, {override: true})
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

    function setReflectionPosition() {

        var mouseX = me.stage.mouseX;
        var width = me.stageWidth;
        var distanceX = width - mouseX;
        var glowY = distanceX * 0.2;

        _reflection.glow.y = glowY;
    }

    function setRotation() {

        var mouseX = me.stage.mouseX;
        var width = me.stageWidth;
        var originX = width / 2;
        var distanceX = originX - mouseX;
        var rotation = distanceX * 0.01;
        var offset = rotation * 10;
        var inversedRotation = rotation *-1;
        var inversedOffset = offset *-1;

        _scaleContainer.rotation = rotation;
        _scaleContainer.x = offset;

        _screen.face.rotation = inversedRotation;
        _screen.face.x = _screen.width / 2 + inversedOffset;
        _screen.face.y = _screen.height / 2;
        _reflection.glow.rotation = inversedRotation;
    }

    /**
     * base scale is the scale for scaleContainer.
     * base scale controls what is the correct
     * scale for the current stage size
     *
     * @return     {number}     scale value
     */
    function calculateBaseScale() {

        // normal base scale
        var normalScale = 1.3;

        // base scale cannot be lower than this
        var minScale = 0.5;

        // how many percents the size may be bigger than
        // stage size before starting to decrease scale
        // 0 = exact fit, > 0 = scaled bigger than stage
        var maxExceedingPct = 0.1;

        var scale = normalScale;

        // how many pixels the size may be bigger
        var maxExceedingSize = me.stageHeight * maxExceedingPct;

        // size scaled to normal
        var normalSize = _phoneBitmap.height * normalScale;

        // how many pixels the size is bigger than stage size
        var exceedingSize = normalSize - me.stageHeight;

        // do we need to scale down? i.e. is it too small stage
        if(exceedingSize > maxExceedingSize) {

            // maximum size in a small stage
            var maxSize = me.stageHeight + maxExceedingSize;

            // percent of the normal size
            var pctOfNormalSize = maxSize / normalSize;

            // calculate new normal scale for the small stage
            scale = normalScale * pctOfNormalSize;
        }

        if(scale < minScale) {

            scale = minScale;
        }

        return scale;
    }

    function addClickHandler() {
        me.on("click", function() {
            _screen.face.setRandomFaceParts();
            _screen.face.setRandomPositions();
            _screen.screenFlash.flash();
            update();
        });
    }

    me.BasicContainer_constructor();
};

var proto = createjs.extend(Phone, BasicContainer);

module.exports = createjs.promote(Phone, "BasicContainer");
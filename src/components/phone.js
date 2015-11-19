
"use strict";

var BasicContainer = require("../components/basicContainer.js");
var PhoneBitmap = require("../components/bitmap/phoneBitmap.js");
var Screen = require("../components/screen.js");
var Reflection = require("../components/reflection.js");
var Hand = require("../components/hand.js");
var HandOverlay = require("../components/handOverlay.js");
var TweenUtil = require("../utils/tweenUtil.js");

var Phone = function() {

    var me = this;

    var _screen;
    var _phoneBitmap;
    var _scaleContainer;
    var _reflection;
    var _hand;
    var _handOverlay;

    var _baseScale;

    var _introPlaying = true;

    me.initialize = function() {

        _screen = new Screen();
        _phoneBitmap = new PhoneBitmap();
        _reflection = new Reflection();
        _hand = new Hand();
        _handOverlay = new HandOverlay();
    };

    me.onAdded = function() {

        _scaleContainer = createScaleContainer(_phoneBitmap);

        _scaleContainer.addChild(_hand);
        _scaleContainer.addChild(_phoneBitmap);
        _scaleContainer.addChild(_screen);
        _scaleContainer.addChild(_reflection);
        // _scaleContainer.addChild(_handOverlay);
        me.addChild(_scaleContainer);

        var easing = createjs.Ease.sineInOut;
        var duration = 1200;

        me.alpha = 0;

        createjs.Tween
            .get(me)
            .to({alpha:1}, duration, easing);
    };

    me.onResize = function() {

        me.x = me.stageCenterX;
        me.y = me.stageCenterY;

        _baseScale = calculateBaseScale();

        setScale(0);

        if(!_introPlaying) {

            setRotation();
        }
    };

    me.start = function() {

        _introPlaying = true;

        var duration = 1000;
        var easing = createjs.Ease.quadInOut;

        createjs.Tween
            .get(_scaleContainer)
            .to({rotation: -45}, duration, easing);

        // let the animations in screen finish then
        // rotate back to normal and enable interactions
        _screen.start()
            .then(function() {

                return TweenUtil.tween(_scaleContainer, {rotation: 0}, duration, easing);
            })
            .then(function() {

                me.setMouseEnabled();

                _introPlaying = false;
            });
    };

    function createScaleContainer(phoneBitmap) {

        var container = new createjs.Container();
        container.regX = phoneBitmap.centerX;
        container.regY = phoneBitmap.centerY;

        return container;
    }

    me.onMouseMove = function() {

        if(!_introPlaying) {

            var scalePosition = calculateScalePosition(me.stage.mouseY);
            var mouseX = me.stage.mouseX;

            setScale(scalePosition);
            setRotation(mouseX);
            setReflectionPosition();
        }
    };

    me.onTouchMove = function(event) {

        if(!_introPlaying) {

            var touchObject = event.changedTouches[0];
            var scalePosition = calculateScalePosition(touchObject.clientY);
            var touchX = touchObject.clientX;

            setScale(scalePosition);
            setRotation(touchX);
            setReflectionPosition();
        }
    };

    function setScale(scalePosition) {

        // top 30% of the screen is the area in which the
        // scaling happens. otherwise phone doesn't scale
        // when mouse is at 30% from the top, scaling is at max
        // when mouse is at 0% from the top, scaling is at min

        var minScale = _baseScale * 0.5;
        var scaleRange = _baseScale - minScale;
        var scale = minScale + scaleRange * scalePosition;

        var easing = createjs.Ease.sineInOut;
        var duration = 120;

        createjs.Tween
            .get(_scaleContainer, {override: !_introPlaying})
            .to({scaleX:scale, scaleY:scale}, duration, easing);
    }

    function calculateScalePosition(y) {

        var scaleStartPct = 0.3;
        var scaleAreaHeight = me.stageHeight * scaleStartPct;
        var scalePosition = y / scaleAreaHeight;

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

    function setRotation(x) {

        var width = me.stageWidth;
        var originX = width / 2;
        var distanceX = originX - x;
        var rotation = distanceX * 0.01;
        var offset = rotation * 10;
        var inversedRotation = rotation *-1;

        _scaleContainer.rotation = rotation;
        _scaleContainer.x = offset;

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

    me.BasicContainer_constructor();
};

var proto = createjs.extend(Phone, BasicContainer);

module.exports = createjs.promote(Phone, "BasicContainer");
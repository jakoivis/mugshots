
"use strict";

var amplify = require("amplify").amplify;

var BasicContainer = require("../../components/basicContainer.js");
var PhoneBitmap = require("../../components/phone/phoneBitmap.js");
var Screen = require("../../components/phone/screen.js");
var Reflection = require("../../components/phone/reflection.js");
var Hand = require("../../components/phone/hand.js");
var HandOverlay = require("../../components/phone/handOverlay.js");
var Topics = require("../../topics.js");

var Phone = function() {

    var me = this;

    var _screen;
    var _phoneBitmap;
    var _scaleContainer;
    var _reflection;
    var _hand;
    var _handOverlay;

    // minimum scale of the phone.
    // the phone won't be scaled smaller than this
    var _phoneScaleMin = 0.5;

    // maximum scale of the phone.
    // the phone won't be scaled bigger than this
    var _phoneScaleMax = 1;

    // minimum amout of free vertical space for the
    // phone. scale is calculated based on this value
    var _phoneMinYSpaceAvailable = 50;

    // calculated phone scale. the resulting
    // scale will depend on the mouseY position
    var _phoneBaseScale;

    var _faceBaseScale = 1;

    me.initialize = function() {

        _screen = new Screen();
        _phoneBitmap = new PhoneBitmap();
        _reflection = new Reflection();
        _hand = new Hand();
        _handOverlay = new HandOverlay();
    };

    me.onApplicationStart = function() {

        _scaleContainer = createScaleContainer(_phoneBitmap);

        // _scaleContainer.addChild(_hand);
        _scaleContainer.addChild(_phoneBitmap);
        // _scaleContainer.addChild(_screen);
        // _scaleContainer.addChild(_reflection);
        // _scaleContainer.addChild(_handOverlay);
        me.addChild(_scaleContainer);

        me.update();

        addClickHandler();
    };

    me.onResize = function() {

        me.x = me.stageWidth / 2;
        me.y = me.stageHeight / 2;

        _phoneBaseScale = calculateBaseScale();

        setScale();
        setRotation();
    };

    function createScaleContainer(phoneBitmap) {

        var container = new createjs.Container();
        container.regX = phoneBitmap.image.width / 2;
        container.regY = phoneBitmap.image.height / 2;

        return container;
    }

    me.update = function() {

        _screen.update();
    };

    me.onMouseMove = function() {

        setScale();
        setRotation();
    };

    function setScale() {

        // top 30% of the screen is the area in which the
        // scaling happens. otherwise phone doesn't scale
        // when mouse is at 30% from the top, scaling is at max
        // when mouse is at 0% from the top, scaling is at min

        var scaleStartPct = 0.3;
        // var baseScale = 1.3;
        var baseScale = calculateBaseScale();
        var minScale = baseScale * 0.5;

        var mouseY = me.stage.mouseY;
        var scaleAreaHeight = me.stageHeight * scaleStartPct;
        var scalePosition = mouseY / scaleAreaHeight;

        scalePosition = scalePosition > 1 ? 1 : scalePosition;

        var scaleRange = baseScale - minScale;
        var scale = minScale + scaleRange * scalePosition;

        // _scaleContainer.scaleX = scale;
        // _scaleContainer.scaleY = scale;


        // var mouseY = me.stage.mouseY;
        // var height = _phoneBitmap.height;
        // var distanceY = height - mouseY;
        // var phoneScale = _phoneBaseScale - distanceY * 0.0002;
        // var faceScale = _faceBaseScale - distanceY * 0.00045;
        // var glowY = distanceY * 0.2;
        var easing = createjs.Ease.sineInOut;
        var duration = 120;

        createjs.Tween
            .get(_scaleContainer, {override:true})
            .to({scaleX:scale, scaleY:scale}, duration, easing);

        // createjs.Tween
        //     .get(_screen.face, {override:true})
        //     .to({scaleX:faceScale, scaleY:faceScale}, duration, easing);

        // createjs.Tween
        //     .get(_reflection.glow, {override:true})
        //     .to({y: glowY}, duration, easing);
    }

    function setRotation() {

        // var mouseX = me.stage.mouseX;
        // var width = me.stageWidth;
        // var originX = width / 2;
        // var distanceX = originX - mouseX;
        // var rotation = distanceX * 0.01;
        // var offset = rotation * 10;
        // var inversedRotation = rotation *-1;
        // var inversedOffset = offset *-1;

        // _scaleContainer.rotation = rotation;
        // _scaleContainer.x = offset;

        // _screen.face.rotation = inversedRotation;
        // _screen.face.x = _screen.width / 2 + inversedOffset;
        // _screen.face.y = _screen.height / 2;
        // _reflection.glow.rotation = inversedRotation;
    }

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
            me.update();
        });
    }

    me.BasicContainer_constructor();
};

var proto = createjs.extend(Phone, BasicContainer);

module.exports = createjs.promote(Phone, "BasicContainer");
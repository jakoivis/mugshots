
"use strict";

var amplify = require("amplify").amplify;

var BasicContainer = require("../../components/basicContainer.js");
var PhoneBitmap = require("../../components/phone/phoneBitmap.js");
var Screen = require("../../components/phone/screen.js");
var Reflection = require("../../components/phone/reflection.js");
var Topics = require("../../topics.js");

var Phone = function() {

    var me = this;

    var _screen;
    var _phoneBitmap;
    var _scaleContainer;
    var _reflection;

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
    };

    // me.addedToStage = function() {

    //     me.stage.on("stagemousemove", function() {


    //     });
    // };

    me.onApplicationStart = function() {

        _scaleContainer = createScaleContainer(_phoneBitmap);

        _scaleContainer.addChild(_phoneBitmap);
        _scaleContainer.addChild(_screen);
        _scaleContainer.addChild(_reflection);
        me.addChild(_scaleContainer);

        me.update();

        addClickHandler();
        initTopics();
    };

    me.onResize = function() {

        me.x = me.stageWidth / 2;
        me.y = me.stageHeight / 2;

        _phoneBaseScale = calculatePhoneBaseScale();

        setScale();
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

        var mouseY = me.stage.mouseY;
        var height = _phoneBitmap.height;
        var distanceY = height - mouseY;
        var phoneScale = _phoneBaseScale - distanceY * 0.0002;
        var faceScale = _faceBaseScale - distanceY * 0.00045;
        var glowY = distanceY * 0.2;
        var easing = createjs.Ease.sineInOut;
        var duration = 120;

        createjs.Tween
            .get(_scaleContainer, {override:true})
            .to({scaleX:phoneScale, scaleY:phoneScale}, duration, easing);

        createjs.Tween
            .get(_screen.face, {override:true})
            .to({scaleX:faceScale, scaleY:faceScale}, duration, easing);

        createjs.Tween
            .get(_reflection.glow, {override:true})
            .to({y: glowY}, duration, easing);
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
        // _screen.face.x = inversedOffset;
        _reflection.glow.rotation = inversedRotation;
    }

    function calculatePhoneBaseScale() {

        var ySpaceAvailable = me.stageHeight - _phoneBitmap.height;

        if(ySpaceAvailable < _phoneMinYSpaceAvailable) {

            ySpaceAvailable = _phoneMinYSpaceAvailable;
        }

        var scaledPhoneHeight = me.stageHeight - ySpaceAvailable;
        var scale = scaledPhoneHeight / _phoneBitmap.height;

        if(scale < _phoneScaleMin) {

            scale = _phoneScaleMin;

        } else if(scale > _phoneScaleMax) {

            scale = _phoneScaleMax;
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

    function initTopics() {

        amplify.subscribe(Topics.NEXT_BACKGROUND, function() {

            _screen.face.stacks.background.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_NOSE, function() {

            _screen.face.stacks.nose.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_LEFT_EYE, function() {

            _screen.face.stacks.lefteye.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_RIGHT_EYE, function() {

            _screen.face.stacks.righteye.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_MOUTH, function() {

            _screen.face.stacks.mouth.next();
            me.update();
        });
    }

    me.BasicContainer_constructor();
};

var proto = createjs.extend(Phone, BasicContainer);

module.exports = createjs.promote(Phone, "BasicContainer");
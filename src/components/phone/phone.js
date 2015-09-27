
"use strict";

var BasicContainer = require("components/basicContainer.js");
var PhoneBitmap = require("components/phone/phoneBitmap.js");
var Screen = require("components/phone/screen.js");
var amplify = require("amplify").amplify;
var Topics = require("topics.js");

var Phone = function() {

    var me = this;

    var _screen;
    var _phoneBitmap;
    var _scaleContainer;

    // minimum scale of the phone.
    // the phone won't be scaled smaller than this
    var _phoneScaleMin = 0.3;

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
    };

    me.onApplicationStart = function() {

        _scaleContainer = createScaleContainer(_phoneBitmap);

        _scaleContainer.addChild(_phoneBitmap);
        _scaleContainer.addChild(_screen);

        me.addChild(_scaleContainer);

        me.update();

        addClickHandler();
        initTopics();
    };

    me.onResize = function() {

        me.x = me.stageWidth / 2;
        me.y = me.stageHeight / 2;

        _phoneBaseScale = calculatePhoneBaseScale();
    };

    me.onTick = function() {

        var mouseY = me.stage.mouseY;
        var height = _phoneBitmap.height;
        var distanceY = height - mouseY;
        var phoneScale = _phoneBaseScale - distanceY * 0.0002;
        var faceScale = _faceBaseScale - distanceY * 0.00045;

        setPhoneScale(phoneScale);
        setFaceScale(faceScale);
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

    function setPhoneScale(scale) {

        _scaleContainer.scaleX = scale;
        _scaleContainer.scaleY = scale;
    }

    function setFaceScale(scale) {

        _screen.face.scaleX = scale;
        _screen.face.scaleY = scale;
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

    function calculateFaceBaseScale() {

    }

    function addClickHandler() {
        me.on("click", function() {
            _screen.face.setRandomFaceParts();
            _screen.face.setRandomPositions();

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
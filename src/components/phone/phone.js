
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

    var _scaleMax;
    var _minYSpaceAvailable = 50; // minimum amout of vertical space for the phone

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

        var ySpaceAvailable = me.stageHeight - _phoneBitmap.height;

        if(ySpaceAvailable < _minYSpaceAvailable) {

            ySpaceAvailable = _minYSpaceAvailable;
        }

        var scaledPhoneHeight = me.stageHeight - ySpaceAvailable;
        var phoneScale = scaledPhoneHeight / _phoneBitmap.height;

        _scaleMax = phoneScale;
    };

    me.onTick = function(event) {

        var mouseY = me.stage.mouseY;
        var height = _phoneBitmap.height;
        var distanceY = height - mouseY;
        var scale = _scaleMax - distanceY * 0.0002;

        setScale(scale);
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

    function setX(x) {

        me.x = x;
        _screen.face.x = _screen.face.x -x;
    }

    function setY(y) {

        me.y = y;
        _screen.face.y = _screen.face.y -y;
    }

    function setScale(scale) {

        if(scale > _scaleMax) {

            scale = _scaleMax;
        }

        _scaleContainer.scaleX = scale;
        _scaleContainer.scaleY = scale;

        // var faceScale = scale-0.4 + (scale*0.5);
        var faceScale = scale + (scale*0.1);
        _screen.face.scaleX = _screen.face.scaleY = faceScale;
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

"use strict";

var BasicContainer = require("components/basicContainer.js");
var Screen = require("components/phone/screen.js");
var amplify = require("amplify").amplify;
var Topics = require("topics.js");

var Phone = function() {

    var me = this;

    var _screen;
    var _phoneBitmap;
    var _scaleContainer;

    var resources = {
        phone: null
    };

    me.initialize = function() {

        _screen = new Screen();
    };

    me.addedToStage = function() {

    };

    me.onApplicationStart = function() {

        _phoneBitmap = createPhoneBitmap();
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
    };

    me.onTick = function(event) {

        var mouseX = me.stage.mouseX;
        var mouseY = me.stage.mouseY;
        var width = me.stageWidth;
        var height = me.stageHeight;
        var centerX = width / 2;
        var centerY = height / 2;
        var distanceX = centerX - mouseX;
        var distanceY = centerY - mouseY;
        var scale = 1 + distanceY * 0.0005;

        setScale(scale);

        _screen.updateCache();
    };

    me.onFileLoadComplete = function(imageLoaderItem) {

        if(imageLoaderItem.name === "phone") {

            resources.phone = imageLoaderItem;
        }
    };

    me.getAcceptedResources = function() {

        return {name: ["phone"]};
    };

    function createScaleContainer(phoneBitmap) {

        var container = new createjs.Container();
        container.regX = phoneBitmap.image.width / 2;
        container.regY = phoneBitmap.image.height / 2;

        return container;
    }

    function createPhoneBitmap() {

        var imageLoaderItem = resources.phone;
        var phoneImage = imageLoaderItem.tag;

        return new createjs.Bitmap(phoneImage);
    }

    me.faceUpdate = function() {

    };

    me.update = function() {

        _screen.face.update();

        _screen.updateCache();
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

        _scaleContainer.scaleX = scale;
        _scaleContainer.scaleY = scale;

        // var phoneWidth = _phoneBitmap.image.width
        // var phoneHeight = _phoneBitmap.image.height;
        // var phoneScaledWidth = phoneWidth * scale;
        // var phoneScaledHeight = phoneHeight * scale;
        // console.log(_phoneBitmap.image.height);
        var faceScale = scale-0.4 + (scale*0.5);
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
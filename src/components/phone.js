
"use strict";

var BasicContainer = require("components/basicContainer.js");
var Face = require("components/face/face.js");
var ScreenShadows = require("components/phone/screenShadows.js");
var Bounds = require("utils/bounds.js");
var amplify = require("amplify").amplify;
var Topics = require("topics.js");

var Phone = function(options) {

    var me = this;

    var _face;
    var _screen;
    var _screenBounds;
    var _phoneBitmap;
    var _scaleContainer;

    var resources = {
        phone: null
    };

    me.initialize = function() {

        _face = createFace();
    };

    me.addedToStage = function() {

    };

    me.onApplicationStart = function() {

        _screenBounds = createScreenBounds(options);
        _phoneBitmap = createPhoneBitmap(options);
        _screen = createScreen(_screenBounds);
        _scaleContainer = createScaleContainer(_phoneBitmap);

        var screenShadows = new ScreenShadows(_screenBounds, 6);

        _screen.addChild(_face);
        _screen.addChild(screenShadows);

        maskScreen(_screen, _face, _screenBounds);

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

    function createScreenBounds(opts) {

        var imageLoaderItem = resources.phone;

        return new Bounds({
            left: imageLoaderItem.screenLeft,
            right: imageLoaderItem.screenRight,
            top: imageLoaderItem.screenTop,
            bottom: imageLoaderItem.screenBottom
        });
    }

    function createScaleContainer(phoneBitmap) {

        var container = new createjs.Container();
        container.regX = phoneBitmap.image.width / 2;
        container.regY = phoneBitmap.image.height / 2;

        return container;
    }

    function createScreen(screenBounds) {

        var phoneScreen = new createjs.Container();
        phoneScreen.x = screenBounds.left;
        phoneScreen.y = screenBounds.top;

        return phoneScreen;
    }

    function createFace() {

        var face = new Face();
        face.setDefaultFaceParts();

        return face;
    }

    function createPhoneBitmap(opts) {

        var imageLoaderItem = resources.phone;
        var phoneImage = imageLoaderItem.tag;

        return new createjs.Bitmap(phoneImage);
    }

    function maskScreen(phoneScreen, face, screenBounds) {

        var mask = new createjs.Shape();
        mask.graphics.beginFill("#FF0000");
        mask.graphics.drawRect(0, 0, screenBounds.width, screenBounds.height);
        mask.cache(0, 0, screenBounds.width, screenBounds.height);

        phoneScreen.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)];
        phoneScreen.cache(0, 0, face.width, face.height);
    }

    me.faceUpdate = function() {

    };

    me.update = function() {

        _face.update();

        _screen.updateCache();
    };

    function setX(x) {

        me.x = x;
        _face.x = _face.x -x;
    }

    function setY(y) {

        me.y = y;
        _face.y = _face.y -y;
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
        _face.scaleX = _face.scaleY = faceScale;
    }

    function addClickHandler() {
        me.on("click", function() {
            _face.setRandomFaceParts();
            _face.setRandomPositions();

            me.update();
        });
    }

    function initTopics() {

        amplify.subscribe(Topics.NEXT_BACKGROUND, function() {

            _face.stacks.background.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_NOSE, function() {

            _face.stacks.nose.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_LEFT_EYE, function() {

            _face.stacks.lefteye.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_RIGHT_EYE, function() {

            _face.stacks.righteye.next();
            me.update();
        });

        amplify.subscribe(Topics.NEXT_MOUTH, function() {

            _face.stacks.mouth.next();
            me.update();
        });
    }

    me.BasicContainer_constructor();
};

var proto = createjs.extend(Phone, BasicContainer);

module.exports = createjs.promote(Phone, "BasicContainer");
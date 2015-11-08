"use strict";

var BasicContainer = require("../components/basicContainer.js");
var ScreenShadows = require("../components/screen/screenShadows.js");
var ScreenBackground = require("../components/screen/screenBackground.js");
var Bounds = require("../utils/bounds.js");
var ScreenPreloader = require("../components/screen/screenPreloader.js");
var ScreenFace = require("../components/screen/screenFace.js");

var Screen = function(screenBounds) {

    var me = this;

    var _screenBounds;
    var _screenPreloader;
    var _screenFace;
    var _screenBackground;
    var _screenShadows;

    var _resources = {
        phone: null
    };

    Object.defineProperty(this, "screenFlash", {

        get: function() { return _screenFace.screenFlash; }
    });

    Object.defineProperty(this, "width", {

        get: function() { return _screenBounds.width; }
    });

    Object.defineProperty(this, "height", {

        get: function() { return _screenBounds.height; }
    });

    Object.defineProperty(this, "face", {

        get: function() { return _screenFace.face; }
    });

    me.getAcceptedResources = function() {

        return {name: ["phone"]};
    };

    me.onFileLoadComplete = function(imageLoaderItem) {

        // we phone need to listen for image only to get dimensions
        if(imageLoaderItem.name === "phone") {

            _resources.phone = imageLoaderItem;
        }
    };

    me.onAdded = function() {

        _screenBounds = createScreenBounds();

        me.x = _screenBounds.left;
        me.y = _screenBounds.top;

        var screenWidth = _screenBounds.width;
        var screenHeight = _screenBounds.height;

        console.log(screenWidth, screenHeight);

        _screenFace = new ScreenFace(screenWidth, screenHeight);
        _screenPreloader = new ScreenPreloader(screenWidth, screenHeight);
        _screenBackground = new ScreenBackground(screenWidth, screenHeight);
        _screenShadows = new ScreenShadows(_screenBounds, 6);

        me.addChild(_screenBackground);
        me.addChild(_screenFace);
        me.addChild(_screenPreloader);
        me.addChild(_screenShadows);

        maskScreen(_screenBounds);

        me.addOnTick();

        _screenBackground.fadeIn();
        _screenPreloader.show();
    };

    me.start = function() {

        _screenPreloader.remove()
            .then(_screenBackground.fadeToWhite)
            .then(function() {

                me.removeChild(_screenPreloader);

                console.log("show");
                _screenFace.show();
            });
    };

    me.onTick = function() {

        // this will update the masked area on the screen.
        // this is needed when phone is scaled,
        // as the face will scale at different rate than phone
        me.updateCache();
    };

    function createScreenBounds() {

        var imageLoaderItem = _resources.phone;

        return new Bounds({
            left: imageLoaderItem.screenLeft,
            right: imageLoaderItem.screenRight,
            top: imageLoaderItem.screenTop,
            bottom: imageLoaderItem.screenBottom
        });
    }

    function maskScreen(screenBounds) {

        var mask = new createjs.Shape();
        mask.graphics.beginFill("#FF0000");
        mask.graphics.drawRect(0, 0, screenBounds.width, screenBounds.height);
        mask.cache(0, 0, screenBounds.width, screenBounds.height);

        me.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)];
        me.cache(0, 0, screenBounds.width, screenBounds.height);
    }

    me.BasicContainer_constructor();
};

createjs.extend(Screen, BasicContainer);

module.exports = createjs.promote(Screen, "BasicContainer");
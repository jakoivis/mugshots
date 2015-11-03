"use strict";

var BasicContainer = require("../components/basicContainer.js");
var ScreenShadows = require("../components/screen/screenShadows.js");
var ScreenFlash = require("../components/screen/screenFlash.js");
var ScreenBackground = require("../components/screen/screenBackground.js");
var Face = require("../components/face.js");
var Bounds = require("../utils/bounds.js");
var ScreenContentPreloader = require("../components/screen/screenContentPreloader.js");

var Screen = function(screenBounds) {

    var me = this;

    var _face;
    var _screenFlash;
    var _screenBounds;
    var _preloaderContent;

    var _resources = {
        phone: null
    };

    Object.defineProperty(this, "screenFlash", {

        get: function() { return _screenFlash; }
    });

    Object.defineProperty(this, "width", {

        get: function() { return _screenBounds.width; }
    });

    Object.defineProperty(this, "height", {

        get: function() { return _screenBounds.height; }
    });

    Object.defineProperty(this, "face", {

        get: function() { return _face; }
    });

    me.initialize = function() {

        _face = new Face();
    };

    me.getAcceptedResources = function() {

        return {name: ["phone"]};
    };

    me.onFileLoadComplete = function(imageLoaderItem) {

        // we phone need to listen for image only to get dimensions
        if(imageLoaderItem.name === "phone") {

            _resources.phone = imageLoaderItem;
        }
    };

    me.onRequiredFilesComplete = function() {

        console.log("Screen::onRequiredFilesComplete");

        _screenBounds = createScreenBounds();

        var screenWidth = _screenBounds.width;
        var screenHeight = _screenBounds.height;

        _preloaderContent = new ScreenContentPreloader(screenWidth, screenHeight);

        _screenFlash = new ScreenFlash(_screenBounds.width, _screenBounds.height);

        var screenShadows = new ScreenShadows(_screenBounds, 6);
        var screenBackground = new ScreenBackground(_screenBounds.width, _screenBounds.height);

        me.x = _screenBounds.left;
        me.y = _screenBounds.top;

        // me.addChild(screenBackground);
        // me.addChild(_face);
        // me.addChild(_screenFlash);
        me.addChild(_preloaderContent);
        me.addChild(screenShadows);

        maskScreen(_screenBounds);

        me.addOnTick();
    };

    me.addedToStage = function() {

        console.log("Screen::addedToStage");

        _preloaderContent.show();
    };

    me.onTick = function() {

        // this will update the masked area on the screen.
        // this is needed when phone is scaled,
        // as the face will scale at different rate than phone
        me.updateCache();
    };

    me.update = function() {

        _face.update();
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
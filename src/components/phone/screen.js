"use strict";

var BasicContainer = require("components/basicContainer.js");
var ScreenShadows = require("components/phone/screenShadows.js");
var Face = require("components/face/face.js");
var Bounds = require("utils/bounds.js");

var Screen = function(screenBounds) {

    var me = this;

    var _face;

    var _screenBounds;

    var _resources = {
        phone: null
    };

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

    me.onApplicationStart = function() {

        _screenBounds = createScreenBounds();

        var screenShadows = new ScreenShadows(_screenBounds, 6);

        me.x = _screenBounds.left;
        me.y = _screenBounds.top;

        _face.x = _screenBounds.right / 2;
        _face.y = _screenBounds.bottom / 2 - 75;

        me.addChild(_face);
        me.addChild(screenShadows);

        maskScreen(_face, _screenBounds);
    };

    me.onFileLoadComplete = function(imageLoaderItem) {

        // we phone need to listen for image only to get dimensions
        if(imageLoaderItem.name === "phone") {

            _resources.phone = imageLoaderItem;
        }
    };

    me.getAcceptedResources = function() {

        return {name: ["phone"]};
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

    function maskScreen(face, screenBounds) {

        var mask = new createjs.Shape();
        mask.graphics.beginFill("#FF0000");
        mask.graphics.drawRect(0, 0, screenBounds.width, screenBounds.height);
        mask.cache(0, 0, screenBounds.width, screenBounds.height);

        me.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)];
        me.cache(0, 0, face.width, face.height);
    }

    me.BasicContainer_constructor();
};

createjs.extend(Screen, BasicContainer);

module.exports = createjs.promote(Screen, "BasicContainer");
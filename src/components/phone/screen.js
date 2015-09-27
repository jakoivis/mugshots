"use strict";

var BasicContainer = require("components/basicContainer.js");
var ScreenShadows = require("components/phone/screenShadows.js");
var Face = require("components/face/face.js");
var Bounds = require("utils/bounds.js");

var Screen = function(screenBounds) {

    var me = this;

    var _face;

    var _resources = {
        phone: null
    };

    Object.defineProperty(this, "face", {

        get: function() { return _face; }
    });

    me.initialize = function() {

        _face = new Face();
    };

    me.onApplicationStart = function() {

        var screenBounds = createScreenBounds();
        var screenShadows = new ScreenShadows(screenBounds, 6);

        me.x = screenBounds.left;
        me.y = screenBounds.top;

        me.addChild(_face);
        me.addChild(screenShadows);

        maskScreen(_face, screenBounds);
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

    me.update = function() {

        _face.update();

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

"use strict";

var BasicContainer = require("./basicContainer.js");
var Bounds = require("../utils/bounds.js");

/**
 * @param {object} options
 * @param {object} options.face                 Face instance
 * @param {object} options.loaderItemPhone      ImageLoaderItem of the phone image
 */
var Phone = function(options) {

    var me = this;

    var _face;
    var _screen;
    var _screenBounds;
    var _phoneBitmap;
    var _scaleContainer;

    me.addedToStage = function() {

        _screenBounds = createScreenBounds(options);
        _phoneBitmap = createPhoneBitmap(options);
        _screen = createScreen(_screenBounds);
        _face = initFace(options);
        _scaleContainer = createScaleContainer(_phoneBitmap);

        var screenShadows = createScreenBorderShadows(_screenBounds);

        _screen.addChild(_face);
        _screen.addChild(screenShadows);

        maskScreen(_screen, _face, _screenBounds);

        _scaleContainer.addChild(_phoneBitmap);
        _scaleContainer.addChild(_screen);

        me.addChild(_scaleContainer);
    };

    me.resize = function() {

        me.x = me.stageWidth / 2;
        me.y = me.stageHeight / 2;
    };

    me.tick = function(event) {

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

    function createScreenBounds(opts) {

        var imageLoaderItem = opts.loaderItemPhone;

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

    function initFace(opts) {

        var face = opts.face;
        face.setDefaultFaceParts();

        return face;
    }

    function createPhoneBitmap(opts) {

        var imageLoaderItem = opts.loaderItemPhone;
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

    function createGlow() {
        // TODO:
    }

    function createScreenBorderShadows(screenBounds) {

        var shadow = new createjs.Shape();
        var colors, ratios, gradX1, gradY1, gradX2, gradY2, x, y, w, h;
        var shadowSize = 6;
        var graphics = shadow.graphics;
        var color1 = "rgba(0, 0, 0, 0.5)";
        var color2 = "rgba(0, 0, 0, 0.3)";
        var color3 = "rgba(0, 0, 0, 0)";

        colors = [color1, color2, color3];
        ratios = [0, 0.3, 1];

        x = 0;
        y = 0;
        w = screenBounds.width;
        h = shadowSize;
        gradX1 = 0;
        gradY1 = 0;
        gradX2 = 0;
        gradY2 = shadowSize;

        graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        graphics.drawRect(x, y, w, h);

        x = 0;
        y = 0;
        w = shadowSize;
        h = screenBounds.height;
        gradX1 = 0;
        gradY1 = 0;
        gradX2 = shadowSize;
        gradY2 = 0;

        graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        graphics.drawRect(x, y, w, h);

        colors = [color3, color2, color1];
        ratios = [0, 0.7, 1];

        x = screenBounds.width - shadowSize;
        y = 0;
        w = shadowSize;
        h = screenBounds.height;
        gradX1 = x;
        gradY1 = 0;
        gradX2 = screenBounds.width;
        gradY2 = 0;

        graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        graphics.drawRect(x, y, w, h);

        x = 0;
        y = screenBounds.height - shadowSize;
        w = screenBounds.width;
        h = shadowSize;
        gradX1 = 0;
        gradY1 = y;
        gradX2 = 0;
        gradY2 = screenBounds.height;

        graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        graphics.drawRect(x, y, w, h);

        return shadow;
    }

    me.BasicContainer_constructor();
};

var proto = createjs.extend(Phone, BasicContainer);

module.exports = createjs.promote(Phone, "BasicContainer");
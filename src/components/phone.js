
"use strict";

var Bounds = require("../utils/bounds.js");
/**
 * @param {object} options
 * @param {object} options.face                 Face instance
 * @param {object} options.loaderItemPhone      ImageLoaderItem of the phone image
 */
var Phone = function(options) {

    this.Container_constructor();

    var me = this;

    var _face;
    var _screen;
    var _screenBounds;
    var _phoneBitmap;

    function init() {

        _screenBounds = createScreenBounds(options);
        _screen = createScreen(_screenBounds);
        _face = initFace(options);
        _phoneBitmap = createPhoneBitmap(options);

        var screenShadows = createScreenBorderShadows(_screenBounds);

        _screen.addChild(_face);
        _screen.addChild(screenShadows);

        maskScreen(_screen, _face, _screenBounds);

        me.addChild(_phoneBitmap);
        me.addChild(_screen);

        setX(0);
        setY(0);
        setScale(1);
    }

    function createScreenBounds(opts) {

        var imageLoaderItem = opts.loaderItemPhone;

        return new Bounds({
            left: imageLoaderItem.screenLeft,
            right: imageLoaderItem.screenRight,
            top: imageLoaderItem.screenTop,
            bottom: imageLoaderItem.screenBottom
        });
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

        me.scaleX = me.scaleY = scale;
        var faceScale = scale + (scale*0.05);
        _face.scaleX = _face.scaleY = faceScale;
    }

    function createGlow() {
        // TODO:
    }

    function createScreenBorderShadows(screenBounds) {

        var shadow = new createjs.Shape();
        var colors, ratios, gradX1, gradY1, gradX2, gradY2, x, y, w, h;
        var shadowSize = 6;
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

        shadow.graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        shadow.graphics.drawRect(x, y, w, h);

        x = 0;
        y = 0;
        w = shadowSize;
        h = screenBounds.height;
        gradX1 = 0;
        gradY1 = 0;
        gradX2 = shadowSize;
        gradY2 = 0;

        shadow.graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        shadow.graphics.drawRect(x, y, w, h);

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

        shadow.graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        shadow.graphics.drawRect(x, y, w, h);

        x = 0;
        y = screenBounds.height - shadowSize;
        w = screenBounds.width;
        h = shadowSize;
        gradX1 = 0;
        gradY1 = y;
        gradX2 = 0;
        gradY2 = screenBounds.height;

        shadow.graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        shadow.graphics.drawRect(x, y, w, h);

        return shadow;
    }

    init();
};

var proto = createjs.extend(Phone, createjs.Container);

module.exports = createjs.promote(Phone, "Container");
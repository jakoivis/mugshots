
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

    function init() {

        initScreenBounds();

        _face = options.face;
        _face.setDefaultFaceParts();

        var imageLoaderItem = options.loaderItemPhone;
        var phoneImage = imageLoaderItem.tag;

        var phoneBitmap = new createjs.Bitmap(phoneImage);
        me.addChild(phoneBitmap);

        _screen = new createjs.Container();
        _screen.addChild(_face);

        var screenShadows = createScreenShadows();
        _screen.addChild(screenShadows);

        maskScreen();

        _screen.x = imageLoaderItem.screenLeft;
        _screen.y = imageLoaderItem.screenTop;

        _face.x = -50;

        me.addChild(_screen);

    }

    function initScreenBounds() {

        var imageLoaderItem = options.loaderItemPhone;

        _screenBounds = new Bounds({
            left: imageLoaderItem.screenLeft,
            right: imageLoaderItem.screenRight,
            top: imageLoaderItem.screenTop,
            bottom: imageLoaderItem.screenBottom
        });
    }

    function maskScreen() {

        var mask = new createjs.Shape();
        mask.graphics.beginFill("#FF0000");
        mask.graphics.drawRect(0, 0, _screenBounds.width, _screenBounds.height);
        mask.cache(0, 0, _screenBounds.width, _screenBounds.height);

        _screen.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)];
        _screen.cache(0, 0, _face.width, _face.height);
    }

    me.update = function() {

        _face.update();

        _screen.updateCache();
    };

    function createScreenShadows() {

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
        w = _screenBounds.width;
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
        h = _screenBounds.height;
        gradX1 = 0;
        gradY1 = 0;
        gradX2 = shadowSize;
        gradY2 = 0;

        shadow.graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        shadow.graphics.drawRect(x, y, w, h);

        colors = [color3, color2, color1];
        ratios = [0, 0.7, 1];

        x = _screenBounds.width - shadowSize;
        y = 0;
        w = shadowSize;
        h = _screenBounds.height;
        gradX1 = x;
        gradY1 = 0;
        gradX2 = _screenBounds.width;
        gradY2 = 0;

        shadow.graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        shadow.graphics.drawRect(x, y, w, h);

        x = 0;
        y = _screenBounds.height - shadowSize;
        w = _screenBounds.width;
        h = shadowSize;
        gradX1 = 0;
        gradY1 = y;
        gradX2 = 0;
        gradY2 = _screenBounds.height;

        shadow.graphics.beginLinearGradientFill(colors, ratios, gradX1, gradY1, gradX2, gradY2);
        shadow.graphics.drawRect(x, y, w, h);

        return shadow;
    }

    init();
};

var proto = createjs.extend(Phone, createjs.Container);

module.exports = createjs.promote(Phone, "Container");
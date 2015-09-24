
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

    function createScreenShadow() {
        var colors = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"];
        var ratios = [0, 1];

        var shadow = new createjs.Shape();
        shadow.graphics.beginLinearGradientFill(colors, ratios, 0, 0, 0, 120);
        shadow.graphics.drawRect(0, 0, _screenBounds.width, 120);
    }

    init();
};

var proto = createjs.extend(Phone, createjs.Container);

module.exports = createjs.promote(Phone, "Container");
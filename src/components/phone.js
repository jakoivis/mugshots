
"use strict";

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

    function init() {

        _face = options.face;
        _face.setDefaultFaceParts();
        // _face.update();

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

    function maskScreen() {

        var imageLoaderItem = options.loaderItemPhone;
        var screenLeft = imageLoaderItem.screenLeft;
        var screenRight = imageLoaderItem.screenRight;
        var screenTop = imageLoaderItem.screenTop;
        var screenBottom = imageLoaderItem.screenBottom;
        var screenWidth = screenRight - screenLeft;
        var screenHeight = screenBottom - screenTop;

        var mask = new createjs.Shape();
        mask.graphics.beginFill("#FF0000");
        mask.graphics.drawRect(0, 0, screenWidth, screenHeight);
        mask.cache(0, 0, screenWidth, screenHeight);

        _screen.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)];
        _screen.cache(0, 0, _face.width, _face.height);
    }

    me.update = function() {

        _face.update();

        _screen.updateCache();
    };

    init();
};

var proto = createjs.extend(Phone, createjs.Container);

module.exports = createjs.promote(Phone, "Container");
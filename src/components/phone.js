
"use strict";

/**
 * @param {object} options
 * @param {object} options.face                 Face instance
 * @param {object} options.loaderItemPhone      ImageLoaderItem of the phone image
 */
var Phone = function(options) {

    this.Container_constructor();

    var me = this;

    function init() {

        var imageLoaderItem = options.loaderItemPhone;
        var phoneImage = imageLoaderItem.tag;

        var phoneBitmap = new createjs.Bitmap(phoneImage);
        me.addChild(phoneBitmap);

        var screenLeft = imageLoaderItem.screenLeft;
        var screenRight = imageLoaderItem.screenRight;
        var screenTop = imageLoaderItem.screenTop;
        var screenBottom = imageLoaderItem.screenBottom;

        var mask = new createjs.Shape();
        mask.graphics.beginFill("#000000");
        mask.graphics.drawRect(screenLeft, screenTop, screenRight, screenBottom);
        mask.cache(screenLeft, screenTop, screenRight, screenBottom);

        var face = options.face;
        face.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)];
        face.cache(screenLeft, screenTop, screenRight, screenBottom);

        me.addChild(face);
    }

    init();
};

var proto = createjs.extend(Phone, createjs.Container);

module.exports = createjs.promote(Phone, "Container");
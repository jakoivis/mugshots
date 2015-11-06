
"use strict";

var amplify = require("amplify").amplify;

var Topics = require("../../topics.js");
var ImageCache = require("../../imageCache.js");

/**
 * @class
 *
 * - getAcceptedResourceName    Implement function returning the name of the image
 */
var BasicBitmap = function() {

    var me = this;

    Object.defineProperty(this, "width", {

        get: function() { return me.image.width; }
    });

    Object.defineProperty(this, "height", {

        get: function() { return me.image.height; }
    });

    function init() {

        var name = me.getAcceptedResourceName();
        var imageLoaderItem = ImageCache.getItemByName(name);

        if(imageLoaderItem) {

            onFileLoadComplete(imageLoaderItem);
            console.log("image found from cache: ", imageLoaderItem.name);

        } else {

            amplify.subscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        }

    }

    function onFileLoadComplete(imageLoaderItem) {

        if(isAcceptedResource(imageLoaderItem)) {

            amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);

            me.image = imageLoaderItem.tag;
        }
    }

    function isAcceptedResource(imageLoaderItem) {

        var resourceName = me.getAcceptedResourceName();

        if(resourceName === imageLoaderItem.name) {

            return true;
        }

        return false;
    }

    me.Bitmap_constructor();

    init();
};

createjs.extend(BasicBitmap, createjs.Bitmap);

module.exports = createjs.promote(BasicBitmap, "Bitmap");

"use strict";

var TOPICS = require("./topics.js");
var amplify = require("amplify").amplify;
var PreloaderList = require("./preloaderList.js");
var ImageLoader = require("ImageLoader");

function PreloadService()
{
    var me = this;
    var backgroundModeLimit = 0.2;
    var isBackgroundMode = false;
    var loader;

    me.load = function()
    {
        loader = new ImageLoader({
            images: PreloaderList.getList(),
            onFileComplete: onFileComplete,
            onComplete: onComplete
        });
    };

    function onFileComplete(item)
    {
        if(!item.isFailed())
        {
            amplify.publish(TOPICS.PRELOAD_ITEM_COMPLETE, item);
        }

        if(canSwitchToBackgroundLoading())
        {
            amplify.publish(TOPICS.PRELOAD_BACKGROUND);
        }
    }

    function onComplete()
    {
        amplify.publish(TOPICS.PRELOAD_COMPLETE);
    }

    function canSwitchToBackgroundLoading()
    {
        if(isBackgroundMode === false &&
            loader.getPercentLoaded() >= backgroundModeLimit)
        {
            isBackgroundMode = true;
            return true;
        }

        return false;
    }
}

module.exports = new PreloadService();
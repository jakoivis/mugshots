
"use strict";

var amplify = require("amplify").amplify;

var TOPICS = require("../topics.js");
var PreloaderList = require("../services/preloaderList.js");
require("ImageLoader");

function PreloadService() {

    var me = this;
    var percentToLoadBeforeBGMode = 0.2;
    var isBackgroundMode = false;
    var requiredFilesLoaded = false;
    var loader;

    me.load = function() {

        loader = new ImageLoader({
            images: PreloaderList.getList(),
            onFileComplete: onFileComplete,
            onComplete: onComplete,
            simulationDelayMin: 10,
        });
    };

    function onFileComplete(item) {

        if(item.isComplete()) {

            amplify.publish(TOPICS.PRELOAD_ITEM_COMPLETE, item);
        }

        if(!item.required && !requiredFilesLoaded) {

            // items are orderer so that required are first
            // when first non-required comes, all required are complete

            requiredFilesLoaded = true;

            amplify.publish(TOPICS.PRELOAD_REQUIRED_COMPLETE);
        }

        if(canSwitchToBackgroundLoading()) {

            amplify.publish(TOPICS.PRELOAD_APPLICATION_START);
        }
    }

    function onComplete() {

        amplify.publish(TOPICS.PRELOAD_COMPLETE);
    }

    function canSwitchToBackgroundLoading() {

        if(isNotInBackgroundMode() && loadedEnough() && requiredImagesAreLoaded()) {

            isBackgroundMode = true;

            return true;
        }

        return false;
    }

    function isNotInBackgroundMode() {

        return isBackgroundMode === false;
    }

    function loadedEnough() {

        return loader.getPercentLoaded() >= percentToLoadBeforeBGMode;
    }

    function requiredImagesAreLoaded() {

        var length = loader.length();
        var item;

        for(var i = 0; i < length; i++) {

            item = loader.getItemAt(i);

            if(item.required === true && !item.isComplete()) {

                return false;
            }
        }

        return true;
    }
}

module.exports = new PreloadService();

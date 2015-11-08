
"use strict";

var _ = require("lodash");
var amplify = require("amplify").amplify;

var Topics = require("../topics.js");
var ImageCache = require("../imageCache.js");

/**
 * BasicContainer handles subsicribing to pubsub channel of image loader service.
 * Whenever image has been loaded, it is cheched whether it is accepted by this
 * BasicContainer instance and then a callback is called to notify the sub class.
 *
 * TODO: if instantiated after onApplicationStart it misses that event and also onRequiredFilesComplete
 *
 * @class
 * @abstract
 * @param      {<type>}  options  { description }
 *
 * - stageWidth     getter
 * - stageHeight    getter
 *
 * - initialize
 * - onAdded
 * - onResize
 * - onTick
 * - onPreloadComplete
 * - onFileLoadComplete
 * - onRequiredFilesComplete
 * - getAcceptedResources   Implement this function to filter out resources that aren't used by this compnent
 * - onApplicationStart
 */
var BasicContainer = function(options) {

    var me = this;

    Object.defineProperty(this, "stageWidth", {

        get: function() { return window.innerWidth; }
    });

    Object.defineProperty(this, "stageHeight", {

        get: function() { return window.innerHeight; }
    });

    Object.defineProperty(this, "stageCenterX", {

        get: function() { return me.stageWidth / 2; }
    });

    Object.defineProperty(this, "stageCenterY", {

        get: function() { return me.stageHeight / 2; }
    });

    function init() {

        if(me.initialize) {

            me.initialize();
        }

        me.addEventListener("added", added);
        // me.addEventListener("addedToStage", addedToStage);

        if(me.getAcceptedResources) {

            getImagesFromCache();
        }

        listenForLoadedImages();
    }

    function getImagesFromCache() {

        var accepted = me.getAcceptedResources();
        var items = ImageCache.getItems(accepted);

        _.forEach(items, function(item) {

            onFileLoadComplete(item);
        });
    }

    function listenForLoadedImages() {

        amplify.subscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.subscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        }

        if(me.onRequiredFilesComplete) {

            amplify.subscribe(Topics.PRELOAD_REQUIRED_COMPLETE, me.onRequiredFilesComplete);
        }

        if(me.onApplicationStart) {

            amplify.subscribe(Topics.PRELOAD_APPLICATION_START, me.onApplicationStart);
        }
    }

    function added(event) {

        event.target.removeEventListener("added", added);

        if(me.onAdded) {

            me.onAdded();
        }

        me.addOnResize();
    }

    function onPreloadComplete() {

        amplify.unsubscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        }

        if(me.onRequiredFilesComplete) {

            amplify.unsubscribe(Topics.PRELOAD_REQUIRED_COMPLETE, me.onRequiredFilesComplete);
        }

        if(me.onApplicationStart) {

            amplify.unsubscribe(Topics.PRELOAD_APPLICATION_START, me.onApplicationStart);
        }

        if(me.onPreloadComplete) {

            me.onPreloadComplete();
        }
    }

    function onFileLoadComplete(imageLoaderItem) {

        if(isAcceptedResource(imageLoaderItem)) {

            me.onFileLoadComplete(imageLoaderItem);
        }
    }

    function isAcceptedResource(imageLoaderItem) {

        if(!me.onFileLoadComplete || imageLoaderItem.isFailed()) {

            // if callback is not implemented or image has failed to load
            // we don't need to accept this resource
            return false;
        }

        if(!me.getAcceptedResources) {

            return false;
        }

        var accepted = me.getAcceptedResources();

        for(var property in accepted) {

            if(accepted[property].indexOf(imageLoaderItem[property]) > -1) {

                return true;
            }
        }

        return false;
    }

    me.addOnResize = function() {

        if(me.onResize) {

            window.addEventListener("resize", me.onResize);

            me.onResize();
        }
    };

    me.removeOnResize = function() {

        if(me.onResize) {

            window.removeEventListener("resize", me.onResize);
        }
    };

    me.addOnTick = function() {

        if(me.onTick) {

            me.on("tick", me.onTick);
        }
    };

    me.removeOnTick = function() {

        if(me.onTick) {

            me.off("tick", me.onTick);
        }
    };

    me.setMouseEnabled = function() {

        me.mouseEnabled = true;

        addMouseMove();
    };

    me.setMouseDisabled = function() {

        me.mouseEnabled = false;

        removeMouseMove();
    };

    function addMouseMove() {

        if(me.onMouseMove) {

            me.stage.on("stagemousemove", me.onMouseMove);
        }
    }

    function removeMouseMove() {

        if(me.onMouseMove) {

            me.stage.off("stagemousemove", me.onMouseMove);
        }
    }

    me.Container_constructor();

    init();
};

var proto  = createjs.extend(BasicContainer, createjs.Container);

module.exports = createjs.promote(BasicContainer, "Container");

"use strict";

var amplify = require("amplify").amplify;
var Topics = require("../topics.js");

/**
 * @class
 * @param      {<type>}  options  { description }
 *
 * - stageWidth     getter
 * - stageHeight    getter
 *
 * - initialize
 * - addedToStage
 * - onResize
 * - onTick
 * - onPreloadComplete
 * - onFileLoadComplete
 * - getAcceptedResources
 * - onApplicationStart
 */
var BasicContainer = function(options) {

    var me = this;

    Object.defineProperty(this, "stageWidth", {

        get: function() { return me.stage.canvas.width; }
    });

    Object.defineProperty(this, "stageHeight", {

        get: function() { return me.stage.canvas.height; }
    });

    function init() {

        if(me.initialize) {

            me.initialize();
        }

        me.addEventListener("added", addedToStage);

        amplify.subscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.subscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        }

        if(me.onApplicationStart) {

            amplify.subscribe(Topics.PRELOAD_BACKGROUND, me.onApplicationStart);
        }
    }

    function addedToStage() {

        me.removeEventListener("added", addedToStage);

        if(me.addedToStage) {

            me.addedToStage();
        }

        if(me.onResize) {

            window.addEventListener("resize", me.onResize);

            me.onResize();
        }

        if(me.onTick) {

            me.on("tick", me.onTick);
        }
    }

    function onPreloadComplete() {

        amplify.unsubscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        }

        if(me.onApplicationStart) {

            amplify.unsubscribe(Topics.PRELOAD_BACKGROUND, me.onApplicationStart);
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

            // if user didn't implement this function
            // we don't need to do any filtering for the accepted resources
            return true;
        }

        var accepted = me.getAcceptedResources();

        for(var property in accepted) {

            if(accepted[property].indexOf(imageLoaderItem[property]) > -1) {

                return true;
            }
        }

        return false;
    }

    me.Container_constructor();

    init();
};

createjs.extend(BasicContainer, createjs.Container);

module.exports = createjs.promote(BasicContainer, "Container");
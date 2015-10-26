
"use strict";

var amplify = require("amplify").amplify;

var Topics = require("../topics.js");

/**
 * @class
 * @abstract
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
 * - getAcceptedResources   Implement this function to filter out resources that aren't used by this compnent
 * - onApplicationStart
 */
var BasicContainer = function(options) {

    var me = this;

    var isAddedToStage = false;

    Object.defineProperty(this, "isAddedToStage", {

        get: function() { return isAddedToStage; }
    });

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

        me.addEventListener("added", added);
        me.addEventListener("addedToStage", addedToStage);

        amplify.subscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.subscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
        }

        if(me.onApplicationStart) {

            amplify.subscribe(Topics.PRELOAD_APPLICATION_START, me.onApplicationStart);
        }
    }

    function added(event) {

        var target = event.target;
        var stage = target.stage;

        target.removeEventListener("added", added);

        if(stage) {

            notifyAddedToStage(target);
            target.dispatchEvent("addedToStage");
        }
    }

    function notifyAddedToStage(target) {

        var child;

        if(target.children) {

            for(var i = 0; i < target.children.length; i++) {
                child = target.children[i];
                child.dispatchEvent("addedToStage");
                notifyAddedToStage(child);
            }
        }
    }

    function addedToStage() {

        me.removeEventListener("addedToStage", addedToStage);

        isAddedToStage = true;

        attachOnResize();
        attachOnTick();
        addMouseMove();

        if(me.addedToStage) {

            me.addedToStage();
        }
    }

    function attachOnResize() {

        if(me.onResize) {

            window.addEventListener("resize", me.onResize);

            me.onResize();
        }
    }

    function attachOnTick() {

        if(me.onTick) {

            me.on("tick", me.onTick);
        }
    }

    function addMouseMove() {

        if(me.onMouseMove && me.mouseEnabled) {

            me.stage.on("stagemousemove", me.onMouseMove);
        }
    }

    function removeMouseMove() {

        if(me.onMouseMove) {

            me.stage.off("stagemousemove", me.onMouseMove);
        }
    }

    function onPreloadComplete() {

        amplify.unsubscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, onFileLoadComplete);
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

    me.setMouseEnabled = function() {

        me.mouseEnabled = true;

        if(isAddedToStage) {

            addMouseMove();
        }
    };

    me.setMouseDisabled = function() {

        me.mouseEnabled = false;

        if(isAddedToStage) {

            removeMouseMove();
        }
    };

    me.Container_constructor();

    init();
};

var proto  = createjs.extend(BasicContainer, createjs.Container);

module.exports = createjs.promote(BasicContainer, "Container");
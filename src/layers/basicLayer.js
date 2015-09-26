
"use strict";

var amplify = require("amplify").amplify;
var Topics = require("../topics.js");

/**
 * @class
 * @param {object}      options
 * @param {object}      options.target      HTMLElement canvas which is used for this layer
 *
 * functions that can be implemented in sub class
 * - initialize         Executed once when layer is initialized
 * - onTick             Executed every time for tick event
 * - onPreloadComplete  Executed once when preload has finished
 * - onFileLoadComplete Executed every time when a file has been loaded
 * - onApplicationStart Executed once when application is ready to start
 * - onWindowResize     Ececuted every time when window size changes
 */
var BasicLayer = function(options) {

    var me = this;

    Object.defineProperty(this, "canvas", {

        get: function() { return me.stage.canvas; }
    });

    function init() {

        var canvas = document.getElementById(options.target);

        me.stage = new createjs.Stage(canvas);

        window.addEventListener("resize", onWindowResize);

        onWindowResize();

        if(me.initialize) {

            me.initialize();
        }

        if(me.onTick) {

            createjs.Ticker.on("tick", me.onTick);
        }

        amplify.subscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.subscribe(Topics.PRELOAD_ITEM_COMPLETE, me.onFileLoadComplete);
        }

        if(me.onApplicationStart) {

            amplify.subscribe(Topics.PRELOAD_BACKGROUND, me.onApplicationStart);
        }
    }

    function onPreloadComplete() {

        amplify.unsubscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, me.onFileLoadComplete);
        }

        if(me.onApplicationStart) {

            amplify.unsubscribe(Topics.PRELOAD_BACKGROUND, me.onApplicationStart);
        }

        if(me.onPreloadComplete) {

            me.onPreloadComplete();
        }
    }

    function onWindowResize() {

        me.canvas.width = window.innerWidth;
        me.canvas.height = window.innerHeight;

        if(me.onWindowResize) {

            me.onWindowResize();
        }

        me.stage.update();
    }

    init();
};

module.exports = BasicLayer;
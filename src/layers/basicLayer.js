
"use strict";

var amplify = require("amplify").amplify;

var Topics = require("../topics.js");

/**
 * @class
 * @param {object}  options
 * @param {string}  options.target                  HTMLElement canvas which is used for this layer
 *
 * functions that can be implemented in sub class
 * - initialize             Executed once when layer is initialized.
 *                          Create all components here which need to listen for pubsub channels.
 * - onTick                 Executed every time for tick event
 * - onPreloadComplete      Executed once when preload has finished
 * - onFileLoadComplete     Executed every time when a file has been loaded
 * - onRequiredFilesComplete
 * - onApplicationStart     Executed once when application is ready to start
 * - onResize               Executed every time when window size changes
 */
var BasicLayer = function(options) {

    var me = this;

    var _ticker;

    Object.defineProperty(this, "canvas", {

        get: function() { return me.stage.canvas; }
    });

    Object.defineProperty(this, "stageWidth", {

        get: function() { return me.stage.canvas.width; }
    });

    Object.defineProperty(this, "stageHeight", {

        get: function() { return me.stage.canvas.height; }
    });

    function init() {

        var canvas = document.getElementById(options.target);

        me.stage = new createjs.Stage(canvas);

        updateCanvasSize();

        if(me.initialize) {

            me.initialize();
        }

        window.addEventListener("resize", onResize);

        onResize();

        if(me.onTick) {

            _ticker = createjs.Ticker.on("tick", me.onTick);
        }

        amplify.subscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.subscribe(Topics.PRELOAD_ITEM_COMPLETE, me.onFileLoadComplete);
        }

        if(me.onRequiredFilesComplete) {

            amplify.subscribe(Topics.PRELOAD_REQUIRED_COMPLETE, me.onRequiredFilesComplete);
        }

        if(me.onApplicationStart) {

            amplify.subscribe(Topics.PRELOAD_APPLICATION_START, me.onApplicationStart);
        }
    }

    function onPreloadComplete() {

        amplify.unsubscribe(Topics.PRELOAD_COMPLETE, onPreloadComplete);

        if(me.onFileLoadComplete) {

            amplify.unsubscribe(Topics.PRELOAD_ITEM_COMPLETE, me.onFileLoadComplete);
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

    function onResize() {

        updateCanvasSize();

        if(me.onResize) {

            me.onResize();
        }

        me.stage.update();
    }

    function updateCanvasSize() {

        me.canvas.width = window.innerWidth;
        me.canvas.height = window.innerHeight;
    }

    /**
     * Enable or disable mouse pointer events on this layer.
     * Disabling mouse events allows clicking through the canvas.
     *
     * @method     setMousePointerEvents
     * @param      {boolean}  enabled  set false in case no mouse events are needed
     */
    me.setMousePointerEvents = function(enabled) {

        if(enabled) {

            me.canvas.style["pointer-events"] = "visible";

        } else {

            me.canvas.style["pointer-events"] = "none";
        }
    };

    /**
     * Remove ticker listener
     *
     * @method     killTickerHandler
     */
    me.killTickerHandler = function() {

        createjs.Ticker.off("tick", _ticker);
    };

    /**
     * Remove resize listener
     *
     * @method      killResizeHandler
     */
    me.killResizeHandler = function() {

        window.removeEventListener("resize", onResize);
    };

    /**
     * Handle cleaning. Use this when you are not going to use the layer any more
     *
     * @method      killAll
     */
    me.killAll = function() {

        me.killTickerHandler();
        me.killResizeHandler();

        me.stage.removeAllEventListeners();
        me.stage.clear();
        me.canvas.parentNode.removeChild(me.canvas);
    };

    init();
};

module.exports = BasicLayer;
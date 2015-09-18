
"use strict";

var amplify = require("amplify").amplify;
var TOPICS = require("../topics.js");
var SpinnerWithShadow = require("../components/spinnerWithShadow.js");

module.exports = PreloadLayer;

/**
 * @param           options
 * @param {string}  options.target          Canvas id
 * @param {number}  [options.width]         Canvas width
 * @param {number}  [options.height]        Canvas height
 * @param {boolean} [options.pointerEvents] Canvas pointer events
 *
 * @listens TOPICS.PRELOAD_COMPLETE
 */
function PreloadLayer(options) {

    var canvas;
    var stage;
    var spinner;

    function init() {

        initOptions();

        stage = new createjs.Stage(canvas);
        spinner = new SpinnerWithShadow();

        var container = spinner.container;
        container.x = 100;
        container.y = 100;

        stage.addChild(container);

        spinner.show();

        amplify.subscribe(TOPICS.PRELOAD_COMPLETE, spinner.remove);

        createjs.Ticker.setFPS(30);
        createjs.Ticker.on("tick", timerTickHandler);
    }

    function initOptions() {

        canvas = document.getElementById(options.target);

        if(typeof options.pointerEvents !== "undefined" &&
            Boolean(options.pointerEvents) === false) {

            canvas.style["pointer-events"] = "none";
        }

        if(options.width) {

            canvas.width = options.width;

            // spinnerSettings.fadeInStart.x = options.width >> 1;
        }

        if(options.height) {

            canvas.height = options.height;
        }
    }


    function timerTickHandler(event) {

        spinner.update();
        stage.update(event);
    }

    init();

    return this;
}